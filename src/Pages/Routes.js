import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from 'Context/AuthContext'
import PrivateRoute from 'components/PrivateRoute'
import Edit from './Dashboard/Edit'
import Frontend from './Frontend'

export default function Index() {
  const {isAuthenticated}=useAuthContext()
  return (
    <Routes>
        <Route path='/*' element={<Frontend />}/>
        <Route path='auth/*' element={!isAuthenticated?<Auth/>:<Navigate to="/dashboard"/>}/>
        <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard}/>  }/>
        <Route path="/dashboard/profile/edit/:uid" element={<Edit />} />
    </Routes>
  )
}
