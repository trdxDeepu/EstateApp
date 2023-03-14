import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: true,
  });

  const { type, name, bedrooms, bathrooms, parking, furnished } = formData;

  const OnChange = () => {};

  return (
    <main className="max-w-md px-2 mx-auto ">
      <h1 className="text-3xl font-serif text-center mt-6 font-bold">
        Create Listing
      </h1>
      <form>
        <p className="text-lg mt-6 font-sans font-semibold">Sell / Rent</p>
        <div className="flex mt-3 ">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
           type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
            id="type"
            value="sale"
            onClick={OnChange}
          >
            Sell
          </button>
          <button
            type="button"
            className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
           type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
            id="type"
            value="sale"
            onClick={OnChange}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold font-sans">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={OnChange}
          placeholder="Name "
          maxLength="32"
          minLength="10"
          required
          className=" mt-3 w-full px-4 py-2 text-xl text-gray-700
        bg-white border-gray-300 transition duration-150 ease-in-out rounded
        focus:text-gray-700 focus:bg-white focus:border-slate-300 mb-6 "
        />
        <div className="flex space-x-6 mb-6  ">
          <div className="">
            <p className="  text-lg font-semibold ">Bed</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={OnChange}
              min="1"
              max="20"
              required
              className=" mt-3 w-full px-4 py-2 text-xl text-gray-700 bg-white
              border border-gray-700 rounded transition duration-150 ease-in-out
              focus:text-gray-700 focus:bg-white focus:bg-border-slate-600 text-center "
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold  ">Bath</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={OnChange}
              min="1"
              max="20"
              required
              className="  mt-3 w-full px-4 py-2 text-xl text-gray-700 bg-white
              border border-gray-700 rounded transition duration-150 ease-in-out
              focus:text-gray-700 focus:bg-white focus:bg-border-slate-600 text-center "
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-sans font-semibold">Parking</p>
        <div className="flex mt-3 ">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
           !parking ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
            id="parking"
            value={true}
            onClick={OnChange}
          >
           Yes
          </button>
          <button
            type="button"
            className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
            parking ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
            id="parking"
            value={false}
            onClick={OnChange}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-sans font-semibold">Furnished</p>
        <div className="flex mt-3 ">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
           !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
            id="furnished"
            value={true}
            onClick={OnChange}
          >
           Yes
          </button>
          <button
            type="button"
            className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
           furnished ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
            id="furnished"
            value={false}
            onClick={OnChange}
          >
            No
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
