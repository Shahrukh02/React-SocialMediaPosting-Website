import React from "react";
import { Bars } from "react-loader-spinner";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader_div">
      <Bars
        height="80"
        width="80"
        color="#6366f1"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
