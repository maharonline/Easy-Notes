import {  Col, Image, Row, Typography } from 'antd'
import React from 'react'


const {Title,Text,}=Typography
export default function Hero() {
  return (
    <>
        <Row gutter={[0, 16]} className=' bg-light container-fluid d-flex align-items-center min-vh-100'>
          <Col xs={24} lg={12} md={12} className='d-flex align-items-center justify-content-center' >
            <div   style={{paddingLeft:"120px"}}>
              <Title level={2} className='text-center'>Easy Notes</Title>
              <Text>EasyNotes is a user-friendly application designed to enhance your note-taking experience. With a focus on simplicity and functionality, it allows students and professionals to create, manage, and share notes seamlessly. The app features real-time collaboration, enabling users to work together on study materials and projects</Text>
            </div>

          </Col>
          <Col xs={24} lg={12} md={12} className='container d-flex align-items-center justify-content-center order-first order-lg-last mt-5' >

            <div style={{ width: "80%" }}>

              <Image src='/Assets/image/hero.jpg' preview={false} />
            </div>


          </Col>



        </Row>
    </>
  )
}
