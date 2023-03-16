import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import ListingItem from "../Components/ListingItem";

const Home = () => {
  const [offerListing, setOfferListing] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListing(listings);
        console.log(listings);
      } catch (e) {
        console.log(e);
      }
    }
    fetchListings();
  }, []);

  // Rent offers
  const [rentListing, setRentListing] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListing(listings);
        console.log(listings);
      } catch (e) {
        console.log(e);
      }
    }
    fetchListings();
  }, []);
  const [saleListing, setSaleListing] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListing(listings);
        console.log(listings);
      } catch (e) {
        console.log(e);
      }
    }
    fetchListings();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6 ">
        {offerListing && offerListing.length > 0 && (
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl font-serif font-semibold">
              Recent Offer
            </h2>
            <Link to="/offer">
              <p
                className="px-3 text-sm text-blue-600 font-serif hover:text-blue-800
              transition duration-150 ease-in-out"
              >
                Show more Offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListing.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold font-serif">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out font-serif">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {rentListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold font-serif">
              Places for sale
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out font-serif">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {saleListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
