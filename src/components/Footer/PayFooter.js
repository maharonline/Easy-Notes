import React from 'react'
import { Space,  } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';


export default function PayFooter() {
  const year = new Date().getFullYear()
  return (
    <>
      <div className="container  d-flex justify-content-center flex-column " >
    <hr />
        <div className="row d-flex justify-content-between mb-5  ">
          <div className="col col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 text-sm-center">
            <Space>
              <img src="/Assets/Png/visa.svg" alt="" width={"40px"} />
              <img src="/Assets/Png/mastercard.svg" alt="" width={"40px"} />
              <img src="/Assets/Png/gpay.svg" alt="" width={"40px"} />
              <img src="/Assets/Png/paypal.svg" alt="" width={"40px"} />
            </Space>
          </div>

          <div className="col col-12 col-sm-12 col-md-5 col-lg-6 col-xl-5 text-sm-center  ">
            <Paragraph className='text-white'>&copy;{year} Easy Notes.AllRight Reserved</Paragraph>
          </div>
          <div className="col col-12 col-sm-12 col-md-2 col-lg-2 col-xl-3 text-sm-center ">
            <Space className='fs-3'>

            <FacebookFilled />
            <InstagramFilled/>
            <TwitterSquareFilled/>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}
