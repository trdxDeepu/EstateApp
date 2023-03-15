import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing, id }) => {
  return (
    <li>
      <Link to={`/category/${listing.type}/${id}`}>
        <img src={listing.imgUrls[0]} alt="" />
        <Moment fromNow>{listing.timestamp?.toDate()}</Moment>
        <div>
          <div>
            <MdLocationOn />
            <p>{listing.address}</p>
          </div>
          <p>{listing.name}</p>
          <p>
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && "/month"}
          </p>
          <div>
            <div>
              <p>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div>
              <p>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingItem;
