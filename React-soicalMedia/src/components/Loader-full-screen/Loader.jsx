import React from "react";
import HashLoader from "react-spinners/HashLoader";
import './loader.css'

const Loader = () => {
  return (
    <div className="loader_div">
      <HashLoader
        color={"#6366f1"}
        loading={true}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
     </div>
  );
};

export default Loader;
