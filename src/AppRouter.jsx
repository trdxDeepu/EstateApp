import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Profile from "./Pages/Profile";
import SignIn from "./SigninSignup/SignIn";
import SignUp from "./SigninSignup/SignUp";
import ForgotPassword from "./SigninSignup/ForgotPassword";
import Header from "./Components/Header"

const AppRouter = () => {
  return (
    <>
     <Router>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
    </>
   
  );
};

export default AppRouter;
