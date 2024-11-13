import React from 'react'
import ImageCarousel from 'components/crosoul'
import { Col, Row, Typography } from 'antd'
import {ArrowRightOutlined} from '@ant-design/icons';

const {Title}=Typography

export default function ShopingCatgories() {
  return (
    <>
     <Row gutter={[0, 16]} className='container d-flex align-items-center justify-content-center py-5'>

<Col xs={24} md={24} lg={24}>
  <Title level={2} className='my-5'><ArrowRightOutlined/> Easy Notes by Categories</Title>

  <ImageCarousel />
</Col>
</Row>
    </>
  )
}
