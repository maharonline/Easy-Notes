import { Button, Col, Form, Image, Input, Row,Typography } from 'antd'
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react'
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const {Title}=Typography;

const initialstate={email:""}

export default function ForgotPassword() {
    const [state, setState]=useState(initialstate)
    const [isLoading,setisLoading]=useState(false)

    const handleChange=(e)=>setState(s=>({...s,[e.target.name]:e.target.value}))

    const handleSubmit=(e)=>{
        e.preventDefault()
        const {email}=state
        if(!email) return window.toastify("Plese Enter Your Email","error");

        setisLoading(true)

        sendPasswordResetEmail(auth, email)
      .then(() => {
        window.toastify("Password reset email sent!", "success")
        // ..
      })
      .catch((error) => {
        console.error("error", error);

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      })

      setisLoading(false)
    }
  return (
    <main className='login'>
    <Row gutter={[0, 16]}  >


      <Col xs={24} md={12} lg={12} xl={14}  >
        <Image src="/Assets/image/forgotpass.jpg" width={"100%"} height={"100vh"} preview={false} />

      </Col>

      <Col xs={24} md={12} lg={12} xl={10} className="d-flex  justify-content-center flex-column px-5"   >
        <div className='' >
          <Title level={2}>Forgot Password</Title>
          <p className='text-muted fs-5 '>Enter Your Registered email address.we'll send you a code to reset your password.</p>



          <Form layout={"vertical"} className='mt-2  ' onSubmitCapture={handleSubmit}>

            <FormItem label="Email:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='email' size='large' placeholder='Email' name='email' value={state.email} onChange={handleChange}/>
            </FormItem>
          
          
             <Button type='primary' htmlType='submit' loading={isLoading} size='large' block className='mt-3'>Send Email</Button>
          


          </Form>

        </div>
      </Col>


    </Row>
  </main>
  )
}
