import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import Posts from "./Posts";
import PostBox from "../PostBox/PostBox";
import Loader from "../Loader-full-screen/Loader";


const Profile = ({ userUid }) => {
  const [userData, setUserData] = useState({});
  const [loaderComponent, setLoaderComponent] = useState(true);

  const db = getFirestore(app);

  const getDocumnet = async () => {
    const q = query(collection(db, "users"), where("userUid", "==", userUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserData(doc.data());
      setLoaderComponent(false)
    });
  };

  useEffect(() => {
    getDocumnet();
  }, [userUid]);

  return (
    loaderComponent !== false ? <Loader /> : 
    <div className="main_div">
      <div className="user_profile_box">
        <div className="user_profie_photo">
          <Space wrap size={26}>
            <Avatar size={164} icon={<UserOutlined />} />
          </Space>
          <div className="user_name">
            <h2>
              Name: <span className="user_info">{userData.userName}</span>
            </h2>
            <h3>
              Email: <span className="user_info">{userData.email}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="create_post">
        <PostBox userName={userData.userName} userId={userUid} />
        <div className="all_users_post">
          <Posts  userId={userUid} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
