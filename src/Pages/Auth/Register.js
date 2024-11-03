import React, { useState } from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import FormItem from 'antd/es/form/FormItem';
import { Link } from 'react-router-dom';


const {Title}=Typography;

const initialstate={fullname:"",lastname:"",email:"",password:""}

export default function Register() {
  const [state,setstate]=useState(initialstate);
  const [isProcessing,setisProcessing]=useState(false)
  const handleChange=(e)=>setstate(s=>({...s,[e.target.name]:e.target.value}))
  
  const handleSubmit=(e)=>{
    e.preventDefault();
  
    const {firstname,lastname,email,password}=state
  
    if(!firstname && !lastname && !email && !password  ){return window.toastify("Please Enter Your Information","error")}
          if(password.length<6){return window.toastify("Please Enter Strong Password","error")}

          const formdata={firstname,lastname,fullname:firstname+" "+lastname,email,CreatedDate:serverTimestamp()}

          setisProcessing(true)
          createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        storedata({ ...formdata, uid: user.uid, email: user.email })
        console.log(user);

      })
      .catch((error) => {
        console.error("Registration Error=>", error)
      });

      setisProcessing(false)

  }
  const storedata=async(formdata)=>{
    try {
      await setDoc(doc(firestore, "users", formdata.uid), formdata);
      window.toastify("Register Successfully", "success")
    }

    catch (e) {
      console.error("Todo Database", e)
    }

  }
  return (
    <main className='register'>
      <Row >


        <Col xs={24} md={12} lg={12} xl={13} className='d-none d-md-block '   >
          <Image src="/Assets/image/Register.jpg" width={"100%"} height={"100vh"} preview={false} />
        </Col>

        <Col xs={24} md={12} lg={12} xl={11} className="d-flex  justify-content-center flex-column  px-5" >

          <Title level={2}>Create New Account</Title>
          <p className='text-muted'>Plese enter details</p>



          <Form layout={"vertical"} className='mt-2' onSubmitCapture={handleSubmit}>
            <FormItem label="FirstName:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='text' size='large' placeholder='FirstName' name='firstname' value={state.firstname} onChange={handleChange} />
            </FormItem>
            <FormItem label="LastName:" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='text' size='large' placeholder='LastName' name='lastname' value={state.lastname} onChange={handleChange} />
            </FormItem>
            <FormItem label="Email:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='email' size='large' placeholder='Email' name='email' value={state.email} onChange={handleChange} />
            </FormItem>
            <FormItem label="Password:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input.Password size='large' placeholder='Password' name='password' value={state.password} onChange={handleChange} />
            </FormItem>

            <Button type='primary' htmlType='submit' size='large' loading={isProcessing} block className='mt-3'>Sign Up</Button>

            <p className='text-center mt-4'>Already Have an account?<Link to="/auth/login" className='text-decoration-none'>Sign in</Link></p>



          </Form>

        </Col>


      </Row>
    </main>
  )
}
