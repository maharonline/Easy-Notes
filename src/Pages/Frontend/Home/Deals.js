import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Row, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';


const {Title}=Typography

export default function Deals() {
    const [seconds, setSeconds] = useState(60);

  useEffect(() => {

    let interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 60));


    }, 1000);
    return()=>clearInterval(interval);
  }, [])
  return (
    <>
    <Row gutter={[0, 16]} className='container d-flex align-items-center py-5'>
          <Col xs={24} lg={10} md={12}>



            <div style={{ marginTop: "100px" }} >

              <Title level={2}>Deals of the Month</Title>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>

              <div className="row">
                <div className="col-3">
                  <div className="bg-white shawdow-sm rounded text-center">
                    <h4 className="fw-bold text-dark mb-0">114</h4>
                    <p className="text-uppercase small mb-0">days</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-white shawdow-sm rounded text-center">
                    <h4 className="fw-bold text-dark mb-0">1</h4>
                    <p className="text-uppercase small mb-0">Hours</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-white shawdow-sm rounded text-center">
                    <h4 className="fw-bold text-dark mb-0">54</h4>
                    <p className="text-uppercase small mb-0">Minutes</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-white shawdow-sm rounded text-center">
                    <h4 className="fw-bold text-dark mb-0">{seconds}</h4>
                    <p className="text-uppercase small mb-0">Seconds</p>
                  </div>
                </div>
              </div>

              <div>
                <Button type='primary' className='py-4 px-4 mt-5'>View All Products <ArrowRightOutlined /></Button>
              </div>
            </div>
          </Col>


          <Col xs={24} lg={14} md={12}   >
            <div className='container d-flex align-items-center justify-content-center mt-5'>
              <div style={{ width: "70%" }}>

                <Image src='/Assets/image/hero.png' preview={false} />
              </ div>
            </div>
          </Col>
        </Row>
    </>
  )
}
