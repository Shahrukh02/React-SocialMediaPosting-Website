import React from "react";
import "./Navbar.css";
import { app } from "../../firebase-config";
import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const auth = getAuth(app);
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <div className="nav">
        <div className="logo">
          <h1>Post App</h1>
        </div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;