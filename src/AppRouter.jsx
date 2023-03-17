import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Profile from "./Pages/Profile";
import SignIn from "./SigninSignup/SignIn";
import SignUp from "./SigninSignup/SignUp";
import ForgotPassword from "./SigninSignup/ForgotPassword";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import EditingListing from "./Pages/EditingListing";
import Listing from "./Pages/Listing";
import Category from "./Pages/Category";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/category/:categoryName" element={<Category/>} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="/edit-listing" element={<PrivateRoute />}>
            <Route
              path="/edit-listing/:listingId"
              element={<EditingListing />}
            />
          </Route>
          <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
