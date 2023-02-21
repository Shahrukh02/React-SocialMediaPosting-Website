import React from "react";
import "./Profile.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import Post from "./Post";

const Profile = (props) => {
    console.log(props);
  return (
    <div className="main_div">
      <div className="user_profile_box">
        <div className="user_profie_photo">
          <Space wrap size={26}>
            <Avatar size={164} icon={<UserOutlined />} />
          </Space>
          <div className="user_name">
            <h2>{props.email}</h2>
          </div>
        </div>
      </div>
      <div className="all_users_post">
        <Post />
      </div>
    </div>
  );
};

export default Profile;
