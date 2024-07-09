import React, { useEffect, useState } from 'react'
import {Outlet, Navigate} from 'react-router-dom'
const AnonymousRoutes = () => {
    const [user,setUser]= useState(false);
    useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    },[user])

  return (
    <div>
      {user?<Navigate to='/'/>: <Outlet/>}
    </div>
  )
}

export default AnonymousRoutes
