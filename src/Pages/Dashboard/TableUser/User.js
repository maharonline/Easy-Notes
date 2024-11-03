import React, { useCallback, useEffect, useState } from 'react';
import { firestore } from 'config/firebase';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useAuthContext } from 'Context/AuthContext';
import { Image, Tag, Table, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';  // Import Ant Design's Search component

const { Title } = Typography;

export default function User() {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]); // Add state to store filtered todos
  const [searchText, setSearchText] = useState('');  // State for search input

  const readDocument = useCallback(async () => {
    if (!user?.uid) return; // Ensure user is authenticated

    const q = query(collection(firestore, 'users'))
    const array = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push({ ...data, key: doc.id });  // Add the document ID as the 'key' field
    });
    setDocuments(array);
    setFilteredDocuments(array);  // Set initial filtered documents to all documents
  }, [user?.uid]);

  useEffect(() => {
    readDocument();
  }, [readDocument]);

  // Handle Complete
  const handleComplete = async (todo) => {
    try {
      await updateDoc(doc(firestore, "Todo", todo.id), { status: "Completed" });
      window.toastify("Updated Successfully", "success");
    } catch (e) {
      console.error("updated the todo: ", e);
    }

    const update = documents.map((check) => {
      if (check.id === todo.id) {
        return { ...check, status: "Completed" };
      } else {
        return check;
      }
    });
    setDocuments(update);
    setFilteredDocuments(update); // Update filtered documents
  };

  // Handle Delete
  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "Todo", todo.id));
      const filterDocument = documents.filter((check) => check.id !== todo.id);
      window.toastify("Successfully Deleted", "success");
      setDocuments(filterDocument);
      setFilteredDocuments(filterDocument); // Update filtered documents
    } catch (e) {
      console.log(e);
    }
  };

  // Search handler
  const handleSearch=(value)=>{
    setSearchText(value)

    const filtered=documents.filter((doc)=>doc.title.toLowerCase().includes(value.toLowerCase())||
    doc.msg.toLowerCase().includes(value.toLowerCase())||doc.description.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredDocuments(filtered)

  }

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
          src={photo?.url}
          width={50}
          height={50}
          alt=""
          className='rounded-full object-cover'
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'title',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    
  ];

  return (
    <main>
      <div className='container'>
        <Row>
          <Col span={24}>
            <Title level={3} className='mt-5 text-center'>Users Detail</Title>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className='px-10'>
              <div className='flex justify-end'>

              <Search 
                placeholder="Search todos..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}  // Update search on input change
                style={{ width: "300px" }}/>
                </div>
              <Table dataSource={filteredDocuments} columns={columns} scroll={{ x: 'max-content' }} />
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
