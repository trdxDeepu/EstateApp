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
            <MdLocationOn/>
            <p>{listing.address}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingItem;
