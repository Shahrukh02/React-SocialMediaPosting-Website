import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import Profile from "../Profile-Pages/Profile";

const Home = () => {
  const [userUid, setUserUid] = useState("");

  const auth = getAuth(app);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        setUserUid(uid)

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
      <Profile userUid={userUid} />
    </>
  );
};

export default Home;
