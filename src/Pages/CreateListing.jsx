import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import { v4 as uuidv4 } from "uuid";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const CreateListing = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [geoLocation, setGeoLocation] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  const OnChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    const apiKey = "AIzaSyBHjg0KU5uJ0pLj8_t55mrK8ME28WekFh4";
    let getLocation = {};
    let location;
    if (geoLocation) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      getLocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      getLocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("please enter a correct address");
        return;
      } else {
        getLocation.lat = latitude;
        getLocation.lng = longitude;
      }
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,
      getLocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className="max-w-md px-2 mx-auto ">
        <h1 className="text-3xl font-serif text-center mt-6 font-bold">
          Create Listing
        </h1>
        <form onSubmit={OnSubmit}>
          <p className="text-lg mt-6 font-sans font-semibold">Sell / Rent</p>
          <div className="flex mt-3 ">
            <button
              type="button"
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${
           type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
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
           type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"
         }`}
              id="type"
              value="rent"
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
         ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
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
         ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
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
         ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
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
         ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
              id="furnished"
              value={false}
              onClick={OnChange}
            >
              No
            </button>
          </div>
          <p className="text-lg mt-6 font-semibold font-sans">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={OnChange}
            placeholder="Address"
            required
            className=" mt-3 w-full px-4 py-2 text-xl text-gray-700
        bg-white border-gray-300 transition duration-150 ease-in-out rounded
        focus:text-gray-700 focus:bg-white focus:border-slate-300 mb-6 "
          />
          {!geoLocation && (
            <div className="flex space-x-6 justify-start mb-6">
              <div className="">
                <p className="text-lg font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={OnChange}
                  required
                  min="-90"
                  max="90"
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={OnChange}
                  required
                  min="-180"
                  max="180"
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                />
              </div>
            </div>
          )}
          <p className="text-lg  font-semibold font-sans">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={OnChange}
            placeholder=" Description"
            required
            className=" mt-3 w-full px-4 py-2 text-xl text-gray-700
        bg-white border-gray-300 transition duration-150 ease-in-out rounded
        focus:text-gray-700 focus:bg-white focus:border-slate-300 mb-6 "
          />
          <p className="text-lg font-sans font-semibold">Offers</p>
          <div className="flex mt-3 ">
            <button
              type="button"
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md
         rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
         transition duration-150 ease-in-out w-full 
         ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
              id="offer"
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
         ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
              id="offer"
              value={false}
              onClick={OnChange}
            >
              No
            </button>
          </div>
          <div className="mt-6 flex items-center mb-6 ">
            <div className=" ">
              <p className="text-lg font-sans font-semibold ">Regular Price</p>
              <div className=" flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="regularPrice"
                  value={regularPrice}
                  onChange={OnChange}
                  min="50"
                  max="40000000"
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white
              border border-gray-300 rounded transition duration-150 ease-in-out
              focus:bg-white focus:border-slate-600 focus:text-gray-700 text-center
              "
                />
                {type === "rent" && (
                  <div>
                    <p className="text-md w-full whitespace-nowrap ">
                      {" "}
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {offer && (
            <div className="mt-6 flex items-center mb-6 ">
              <div className=" ">
                <p className="text-lg font-sans font-semibold ">
                  Discounted Price
                </p>
                <div className=" flex w-full justify-center items-center space-x-6">
                  <input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={OnChange}
                    min="50"
                    max="40000000"
                    required={offer}
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white
              border border-gray-300 rounded transition duration-150 ease-in-out
              focus:bg-white focus:border-slate-600 focus:text-gray-700 text-center
              "
                  />
                  {type === "rent" && (
                    <div>
                      <p className="text-md w-full whitespace-nowrap ">
                        {" "}
                        $ / Month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="mb-6 ">
            <p className="font-sans font-semibold text-lg ">Images</p>
            <p className="text-gray-600">
              The first image will be cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={OnChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-b-gray-300 rounded-md
            transition duration-150 ease-in-out
            focus:bg-white focus:border-slate-600   "
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 font-medium font-serif 
        rounded-md shadow-md text-white hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
        focus : shadow-lg active:bg-blue-800 active: shadow-lg
        transition duration-150 ease-in-out "
          >
            Create Listing
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateListing;
