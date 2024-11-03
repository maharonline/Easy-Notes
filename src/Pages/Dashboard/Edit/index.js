import { Col, Input, Row, Form, Progress, Button, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { firestore, storage } from 'config/firebase';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import style from '../../../sass/edit.module.scss';

const initialState = { fullname: '', email: '',firstName:"" ,Datecreated:""};

export default function Edit() {
  const { uid } = useParams();
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState('');
  const [isLoading,setisLoading]=useState(false)

  const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const fetchData = useCallback(async () => {
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setState((s) => ({ ...s, ...data }));
      console.log('Document data:', data);
    } else {
      console.log('No such document!');
    }
  }, [uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email,firstName,Datecreated } = state;
    if (!fullname) return window.toastify('Please Enter Your Name', 'error');

    const formData = { fullname, email, UpdatingTime: serverTimestamp(), };

    setisLoading(true)
    if (file) {
      uploadFile(formData);
    } else {
      createDocument(formData);
    }
  };

  const uploadFile = (formData) => {
    const fileName = formData.uid + '-' + file.name;
    const storageRef = ref(storage, `profile images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progressBar));
        // console.log('Upload is ' + progressBar + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const data = { ...formData, photo: { name: fileName, url: downloadURL } };
          createDocument(data);
        });
      }
    );
  };

  const createDocument = async (formData) => {
    try {
      const docRef = doc(firestore, 'users', uid);

      // Update the timestamp field with the value from the server
      await updateDoc(docRef, formData);
      window.toastify("Profile Updating Successfully","success")
  } catch (e) {
      console.error("Error adding document: ", e);
    }

    setisLoading(false)
    setProgress('');
  };

  const handleFileChange = ({ file }) => {
    // If the file is fully uploaded, set it to state
    if (file.status === 'done') {
      setFile(file.originFileObj);
    }
  };

  return (
    <main className={style.edit}>
      <div className={style.container}>
        <h1 className="text-center">Edit Page</h1>
        <Form onSubmitCapture={handleSubmit}>
          <Row>
            <Col span={24}>
              <FormItem label="Name" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={state.fullname}
                  name="fullname"
                  onChange={handleChange}
                />
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="Email" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}>
                <Input type="email" placeholder="Email" value={state.email} name="email" disabled />
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="File" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}>
                {/* Ant Design Upload component */}
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setFile(file);
                    return false; // Prevent auto upload, we'll handle it manually
                  }}
                  onChange={handleFileChange}
                >
                  <Button>Upload Profile Image</Button>
                </Upload>

                {/* Display progress if a file is being uploaded */}
                {file && progress ? <Progress percent={progress} /> : ''}
              </FormItem>
            </Col>

            <Col span={24}>
              <Button className="w-100" type="primary" htmlType="submit" size="large" loading={isLoading}>
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
}
