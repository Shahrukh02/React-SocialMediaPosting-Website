import React, { useEffect, useState } from "react";
import "./Posts.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { app } from "../../firebase-config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";

const Posts = ({ userId }) => {
  const [userPost, setUserPost] = useState([]);

  const db = getFirestore(app);


  const getDocumnets = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    
      

    });
  };
 


  useEffect(() => {
    getDocumnets();
  }, [userId]);

  return (
    <>
      <div className="card_div">
        <div className="user_info_div">
          <div className="user_icon">
            <Space wrap size={26}>
              <Avatar size={50} icon={<UserOutlined />} />
            </Space>
          </div>
          <div className="name_and_date">
            <div className="user_fullname">Muhammad Shahrukh</div>
            <div className="user_psot_Date">
              <p>01-01-2004</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="user_post">
          <h3>this</h3>
        </div>
        <hr />
        <div className="like_btn">
          <div className="like_icon">
            <i className="fa-regular fa-heart"></i>
          </div>
          <div className="like_count">
            <h3>20</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
