import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Spinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <HashLoader color="#36d68a" size={60} speedMultiplier={1} />
    </div>
  );
};

export default Spinner;
