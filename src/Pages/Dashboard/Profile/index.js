import React from 'react'
import { useAuthContext } from 'Context/AuthContext'
// import { useProfileContext } from '../../../Context/ProfileContext';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import style from "../../../sass/profile.module.scss"
import { useProfileContext } from 'Context/ReadProfileContext';



export default function Profile() {
  
  const {data}=useProfileContext()
  const { users } = useAuthContext()

  return (
    <main >
      <div className={style.profilecard}>

        <h1>Profile Page</h1>
        
        <div className=''>
          <Image src={data?.photo} className='rounded-pill object-fit-cover' preview={false} width={200} height={200}/>
        </div>
        <div className='text-center'>
          <h3>Name:{data?.fullname}</h3>
          <h3>Email:{data?.email}</h3>
          <h3>ID:{data?.id}</h3>
        </div>
      </div>
        <div className='d-flex justify-content-evenly align-items-between text-center'>

        <Link to={`/dashboard/profile/edit/${users?.uid}`} className='btn btn-outline-dark' >Edit Profile</Link>
        <Link to="/dashboard/passwordupdate"  className='btn btn-outline-dark'> Passwordupdate</Link>
        </div>
       

    </main>
      


  )
}
