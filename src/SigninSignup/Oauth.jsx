import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const Oauth = () => {
  const navigate = useNavigate();
  const OnGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      toast.success("Signed in successfully");
      navigate("/profile");
    } catch (err) {
      toast.error("error signing in");
    }
  };

  return (
    <button
      type="button"
      onClick={OnGoogleClick}
      className="flex items-center justify-center
    w-full bg-red-700 text-white px-7 py-3  uppercase
     text-sm font-serif font-medium
     hover:bg-red-800 
     active:bg-red-900
     shadow-md hover:shadow-lg
     active:shadow-lg
     transition duration-150 ease-in-out rounded-md"
    >
      <FcGoogle
        className="text-2xl bg-white rounded-full 
      mr-2 "
      />
      Continue with Google
    </button>
  );
};

export default Oauth;
