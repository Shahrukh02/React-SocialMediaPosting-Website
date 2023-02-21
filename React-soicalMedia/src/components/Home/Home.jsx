import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import Profile from "../Profile-Pages/Profile";

const Home = () => {
  const [userEmail, setUserEmail] = useState('')

  const auth = getAuth(app);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user;
        setUserEmail(uid.email);
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
      <Profile email={userEmail} />
    </>
  );
};

export default Home;
