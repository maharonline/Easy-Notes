import React, { useCallback, useEffect, useState } from 'react';
import { firestore } from 'config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useAuthContext } from 'Context/AuthContext';
import { Image, Table, Row, Col, Typography, Input } from 'antd';

const { Title } = Typography;
const { Search } = Input;

export default function User() {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Fetch user documents from Firestore
  const readDocument = useCallback(async () => {
    if (!user?.uid) return; // Ensure user is authenticated

    const q = query(collection(firestore, 'users'));
    const array = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push({ ...data, key: doc.id });  // Add the document ID as the 'key' field
    });

    setDocuments(array);
    setFilteredDocuments(array);
  }, [user?.uid]);

  useEffect(() => {
    readDocument();
  }, [readDocument]);

  // Search handler
  const handleSearch = (value) => {
    setSearchText(value);

    const filtered = documents.filter((doc) =>
      doc.fullname?.toLowerCase().includes(value.toLowerCase()) ||
      doc.email?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDocuments(filtered);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'uid',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'photo',
      render: (photo) => (
        <Image
          src={photo?.url || 'fallback-image-url'} // Fallback image URL if `photo` is null
          width={50}
          height={50}
          alt="User Image"
          className="rounded-full object-cover"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <main>
      <div className="container">
        <Row>
          <Col span={24}>
            <Title level={3} className="mt-5 text-center">Users Detail</Title>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="px-10">
              <div className="d-flex justify-content-end mb-2 ">
                <Search
                  placeholder="Search users..."
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 300 }}
                />
              </div>
              <Table dataSource={filteredDocuments} columns={columns} scroll={{ x: 'max-content' }} />
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
