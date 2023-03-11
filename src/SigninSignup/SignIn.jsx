import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "./Oauth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../Firebase";
import { toast } from "react-toastify";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const OnChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if(userCredential.user) {
        toast.success("Signed in successfully")
        navigate("/")
      }
    } catch (error) {
      toast.error("User not allowed to Sign in");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-serif text-center mt-6 font-bold ">
        Sign In{" "}
      </h1>
      <div className="font-serif flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto  ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form action="" onSubmit={OnSubmit}>
            <input
              type="email"
              className=" w-full px-4 py-2 text-xl text-gray-700
              bg-white border-gray-300 rounded-md transition ease-in-out mb-6  "
              id="email"
              value={email}
              onChange={OnChange}
              placeholder="Email Address"
            />
            <div className="relative mb-6 ">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 text-xl text-gray-700
              bg-white border-gray-300 rounded-md transition ease-in-out  "
                id="password"
                value={password}
                onChange={OnChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 
                 text-xl cursor-pointer "
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 
                 text-xl cursor-pointer "
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 
          py-3 text-sm font-serif font-medium uppercase 
          rounded-md hover:bg-blue-700 shadow-md
          transition duration-150 ease-in-out
          hover: shadow-lg active:bg-blue-800  "
            >
              Sign In
            </button>
            <div
              className="flex items-center  my-4 before:border-t 
            before:flex-1 before:border-gray-300 
            after:border-t after:flex-1
             after:border-gray-300
          "
            >
              <p
                className="text-center font-semibold font-serif 
            mx-4"
              >
                OR
              </p>
            </div>
          </form>
          <Oauth />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
