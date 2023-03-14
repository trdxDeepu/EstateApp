// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { db } from "../Firebase";
// import { doc, getDoc } from "firebase/firestore";

// const Listing = () => {
//   const params = useParams();
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchListing() {
//       const docRef = doc(db, "listing", params.listingId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setListing(docSnap.data());
//         setLoading(false);
//       }
//     }
//     fetchListing();
//     console.log(listing);
//   }, [params.listingId, listing]);

//   return <div>listing</div>;
// };

// export default Listing;
