import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Depu",
    email: "singhdepu566@gmail.com",
  });

  const {name , email} = formData;

  return (
    <>
      <section className="mx-w-6xl mx-auto-flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-serif font-bold">
          My Profile
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700
      bg-white border border-gray-300 rounder-sm transition ease-in-out"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
