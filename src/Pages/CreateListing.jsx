import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
  });

  const { type } = formData;

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
      </form>
    </main>
  );
};

export default CreateListing;
