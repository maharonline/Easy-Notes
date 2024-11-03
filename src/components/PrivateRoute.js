import { useAuthContext } from 'Context/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({Component}) {
   const {isAuthenticated}=useAuthContext()
   if(!isAuthenticated) return <Navigate to="/"/>
    
  return <Component/>
}
