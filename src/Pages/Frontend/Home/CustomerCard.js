import { Avatar, Col, Rate, Row } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import React from 'react'
// import '../../../sass/customerCard.scss'
import { ArrowRightOutlined } from '@ant-design/icons'


function SingleCustomerCard({ rating, feedback, name, role, avatar }) {
    return (
        <>
        <div className="card px-4 justify-content-center d-flex border-light">
            <div className="card2 w-100 pt-4 px-3">
                <Rate defaultValue={rating} className='mt-3' />
                <Paragraph className='text-muted '>"{feedback}"</Paragraph>
                <div className='d-flex align-items-center flex-row '>
                    <Avatar src={avatar} style={{ height: "64px", width: "64px" }} />
                    <div style={{ marginLeft: '15px' }}>
                        <Title level={4}>{name}</Title>
                        <Paragraph>{role}</Paragraph>
                    </div>
                </div>
            </div>
        </div>
</>
    )

}

export default function CustomerCard() {
    const customers = [
        {
            rating: 5,
            feedback: "Excellent Notes! It exceeded my expectations in every way.",
            name: "Emily Brown",
            role: "Developer",
            avatar: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        },
        {
            rating: 5,
            feedback: "Great value for the Notes, will definitely recommend!",
            name: "Mike Johnson",
            role: "Engineer",
            avatar: "/Assets/image/John Doe.png"
        },
        {
            rating: 5,
            feedback: "Amazing experience, very satisfied with the service.",
            name: "Jane Smith",
            role: "Designer",
            avatar: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
    ];

    return (
        <>
        <div className='container d-flex justify-content-between my-5'>

        <Title level={2} ><ArrowRightOutlined/>Our Achievement </Title>
        </div> 
        <Row gutter={[0, 32]} justify="center" className='container' >
            {customers.map((customer, index) => (
                <Col key={index} xs={24} sm={20} md={12}  lg={10} xl={8} >
                    <SingleCustomerCard {...customer} />
                </Col>
            ))}
        </Row>
            </>
    )
}
