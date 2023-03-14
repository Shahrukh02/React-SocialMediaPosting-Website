import React, { useState, useEffect } from "react";
import { app } from "../../firebase-config";
import PostCard from "../PostCard/PostCard";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader-full-screen/Loader";
import { useNavigate } from "react-router-dom";
import "./AllPosts.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const AllPosts = () => {
  const [loader, setLoader] = useState(true);
  const [usersPost, setUsersPost] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth(app);

  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
      } else {
        console.log("none");
        navigate("/auth/login");
      }
    });
  }, []);

  const getDocumnets = async () => {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsersPost(snapshot.docs.map((doc) => doc.data()));
    });
  };

  useEffect(() => {
    getDocumnets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="all_posts_main_div">
        {usersPost.map((currElem, index) => {
          return (
            <div className="all_users_posts_main" key={index}>
              <div className="all_users_posts">
                <PostCard elements={currElem} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllPosts;
