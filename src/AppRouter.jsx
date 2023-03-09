import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Offer from './Pages/Offer'
import Profile from './Pages/Profile'
import SignIn from './SigninSignup/SignIn'
import SignUp from './SigninSignup/SignUp'
import ForgotPassword from './SigninSignup/ForgotPassword'


const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/offer" element={<Offer/>}/>
        <Route path ="/profile" element={<Profile/>}/>
        <Route path ="/signin" element={<SignIn/>}/>
        <Route path ="/signup" element={<SignUp/>}/>
        <Route path ="/forgot" element={<ForgotPassword/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router