import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {

  const [pageState , setPageState] = useState("Sign In")

  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setPageState(user.displayName)
      }
      else{
        setPageState("Sign In")
      }
    })
  },[auth])

  const location = useLocation();
  const navigate = useNavigate();

  function pathMatchRouter(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div
      className="bg-white border-b shadow-md sticky 
    top-0 z-50  "
    >
      <header
        className="flex justify-between items-center 
      px-3 max-w-6xl mx-auto "
      >
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer "
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 ">
            <li
              className={` cursor-pointer py-3 text-md font-semibold text-gray-400
              border-b-[3px] border-b-transparent ${
                pathMatchRouter("/") && "text-gray-600 border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={` cursor-pointer py-3 text-md font-semibold
             text-gray-400 border-b-[3px] border-b-transparent 
             ${pathMatchRouter("/offer") && "text-gray-600  border-b-red-500"}`}
              onClick={() => navigate("/offer")}
            >
              Offers
            </li>
            <li
              className={` cursor-pointer py-3 text-md font-semibold
             text-gray-400 border-b-[3px] border-b-transparent 
             ${(pathMatchRouter("/sign-in") || pathMatchRouter("/profile")) && "text-gray-600 border-b-red-500"}`}
              onClick={() => navigate("/sign-in")}
            >
            {pageState}
            </li>

           
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
