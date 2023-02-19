import React, { useEffect } from "react";
// import "./Login.css";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const auth = getAuth(app);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        console.log("none");
        navigate("/auth/login");
      }
    });
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
