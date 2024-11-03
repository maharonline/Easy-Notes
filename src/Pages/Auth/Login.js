import React, { useState } from 'react'
import { Button, Checkbox, Col, Form, Image, Input, Row ,Typography} from 'antd'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import FormItem from 'antd/es/form/FormItem'

const {Title ,Paragraph}=Typography

const initialState={email:"",password:""}
export default function Login() {
    const [state,setState]=useState(initialState)
    const [isProcessing,setIsProcessing]=useState(false)

    const handleChange=(e)=>setState(s=>({...s,[e.target.name]:e.target.value}))

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        const {email,password}=state

        if(!email && !password){return window.toastify("Please Enter Your Email And Password For Login")}
        
        setIsProcessing(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        
          const user = userCredential.user;
          console.log("Login user",user);
          
          window.toastify("Login Successfully" , "success")
        })
        .catch((error) => {
            console.error("error=>", error);

        switch (error.code) {
          case "auth/email-already-in-use":
            window.toastify("Email address ", "error"); break;
          default: window.toastify("Something went wrong while creating Login", "error"); break;
        }
        })
        .finally(()=>{
            setIsProcessing(false)
        });

    }
  return (
    <Row className='overflow-hidden'  >


    <Col xs={24} md={12} lg={12} xl={14} className='d-none d-md-block' >
    

      <Image src="/Assets/image/Login.jpg" width={"100%"} height={"100vh"} className='object-fit' preview={false} />
  

    </Col>

    <Col xs={24} md={12} lg={12} xl={10} className="d-flex  justify-content-center flex-column px-5   "   >
      <div className=' mt-sm-5' >
        <Title level={2}>Welcome</Title>
        <p className='text-muted'>Plese login here</p>



        <Form layout={"vertical"} className='mt-2 ' onSubmitCapture={handleSubmit} >

          <FormItem label="Email:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
            <Input type='email' size='large' placeholder='Email' name='email' value={state.email} onChange={handleChange} />
          </FormItem>
          <FormItem label="Password:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
            <Input.Password size='large' placeholder='Password' name='password' value={state.password} onChange={handleChange}/>
          </FormItem>

          <div className='d-flex justify-content-between'>
          <Checkbox >Remember Me</Checkbox>
          <Link className='text-decoration-none' to="/auth/forgotpassword">Forgot Password?</Link>
          </div>


          <Button type='primary' htmlType='submit' size='large' block className='mt-3' loading={isProcessing}>Login</Button>

          <p className='text-center mt-4'>Don't Have an account?<Link to="/auth/register" className='text-decoration-none'>Register</Link></p>


        </Form>

      </div>
    </Col>


  </Row>

  )
}
