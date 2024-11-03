import React from 'react'
import Search from 'antd/es/transfer/search';

import { Link } from 'react-router-dom';




export default function Copyright() {

    return (
       <>
            <div className="container">
                <div className="row pt-5">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 ">
                        <ul  >
                            <li><img src="/Assets/image/Logo.png" alt="" className='logo' /></li>
                            <li><img src="/Assets/Png/call.svg" alt=""  width={"20px"} className='text-white'/> Phone:(704) 555-0127</li>
                            <li><img src="/Assets/Png/email.svg" alt=""  width={"20px"} className='text-white'/> Email:krist@example.com</li>
                            <li><img src="/Assets/Png/location.svg" alt=""  width={"20px"} className='text-white'/> Address:3891 Ranchview California 62639</li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <ul>
                            <li className='fw-bolder'>Information</li>
                            <li ><Link to="/auth/login" className='text-decoration-none text-white'>Login</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <ul>
                            <li className='fw-bolder'>Services</li>
                            <li>About Us</li>
                            <li>Career</li>
                            <li>Delivery Information</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Condition</li>
                        </ul>

                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <ul>
                            <li className='fw-bolder'>Subscribe</li>
                            <li>Enter your email below to be the first to know about new collections and product launches.</li>
                            <li className='mt-4'> <Search placeholder="Send Eamil" />

                            </li>
                        </ul>

                    </div>


                </div>



            </div>
           
           
       </>

    )
}
