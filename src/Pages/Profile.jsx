import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import { updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../Components/ListingItem";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const { name, email } = formData;

  const OnLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  function OnChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function oNSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Could not Update the profile Details");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  async function onDelete(listingId) {
    if (window.confirm("Are You Sure you want to delete ?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Deleted Successfully the listing")
    }
  }

  function onEdit(listingId) {
    navigate(`/edit-listing/${listingId}`);
  }

  return (
    <>
      <section className="mx-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-serif font-bold">
          My Profile
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* name input*/}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={OnChange}
              className={`w-full px-4 py-2 text-xl text-gray-700
      bg-white border border-gray-300 rounder-sm
       transition ease-in-out mb-6 ${
         changeDetail && "bg-red-200 focus:bg-red-200"
       }`}
            />
            {/* email input */}
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700
      bg-white border border-gray-300 rounder-sm transition ease-in-out"
            />

            <div
              className="flex justify-between whitespace-nowrap 
            text-sm sm:text-lg mb-6 "
            >
              <p className="flex items-center ">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && oNSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out
                duration-200 ml-1 cursor-pointer "
                >
                  {changeDetail ? "Apply Changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={OnLogout}
                className="text-blue-600 hover:text-blue-800 
            transition duration-200 cursor-pointer "
              >
                Sign Out
              </p>
            </div>
          </form>

          <button
            type="submit"
            className="w-full bg-blue-600
          text-white uppercase px-7 py-3
          text-sm font-medium rounded-md shadow-md hover:bg-blue-700 active:bg-blue-800
          transition  duration-150 ease-in-out hover:shadow-lg"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center
            "
            >
              {" "}
              <FcHome
                className="mr-2 text-3xl bg-red-200 rounded-full p-1
                  border-2
                "
              />{" "}
              Sell or Rent your home{" "}
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className=" font-serif font-extrabold text-2xl text-center  mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
