import { auth } from 'config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

const Auth=createContext()

const initialstate={isAuthenticated:false,user:{}}

const reducer=(state,{type,payload})=>{
    switch(type){
        case "SET_LOGGED_IN":
            return{isAuthenticated:true,user:payload.user}

            case "SET_LOGGED_OUT":
                return{initialstate}
                case "SET_PROFILE":
                    return{...state,user:payload.user}

                    default:return state
            
    }
}
export default function AuthContext({children}) {
    const [state,dispatch]=useReducer(reducer,initialstate);
    const [isAppLoading,setIsApploading]=useState(true)
    const[users,setUsers]=useState("")

    const profile=useCallback(()=>{
        setTimeout(() => {
            setIsApploading(false)
        }, 2000);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            
            dispatch({type:"SET_LOGGED_IN",payload:{user}})
            setUsers(user)
           // ...
          } else {
            dispatch({type:"SET_LOGGED_OUT"})
            setUsers("")
            // User is signed out
            // ...
          }
        });
    },[])
    useEffect(()=>{
       profile();
       
    },[profile])

    const handleLogout=()=>{
        signOut(auth).then(() => {
          window.toastify("SignOut Successfully","success")
          console.log("Logout");
          
          dispatch({type:"SET_LOGGED_OUT"})
        }).catch((error) => {
          console.log("Logout Error",error);
          window.toastify("Error While Logout ","error")
  
          
        });
  
      }
  return (
    <Auth.Provider value={{isAppLoading,setIsApploading,dispatch,...state,handleLogout,users}}>
        {children}
    </Auth.Provider>
  )
}

export const useAuthContext = () => useContext(Auth)
