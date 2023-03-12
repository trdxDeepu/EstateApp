import React from 'react'
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
    const loggedIn = false;

  return loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default PrivateRoute