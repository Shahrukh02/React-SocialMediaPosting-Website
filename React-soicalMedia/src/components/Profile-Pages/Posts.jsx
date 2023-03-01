import React, { useEffect, useState } from "react";
import "./Posts.css";
import { app } from "../../firebase-config";
import PostCard from "../PostCard/PostCard";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Posts = ({ userId }) => {
  const [userPost, setUserPost] = useState([]);

  const db = getFirestore(app);

  const getDocumnets = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("timeStamp", "desc"),
      where("userId", "==", userId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPost(snapshot.docs.map((doc) => doc.data()));
    });
  };

  useEffect(() => {
    getDocumnets();
  }, [userId]);

  console.log(userPost);
  return (
    <>
      {userPost.map((currElem, index) => {
        return(
          <div className="user_post" key={index}>
             <PostCard elements={currElem} />
          </div>
        );
      })}
    </>
  );
};

export default Posts;
