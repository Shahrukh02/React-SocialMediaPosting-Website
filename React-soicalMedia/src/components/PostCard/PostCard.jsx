import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import "./PostCard.css";

const PostCard = ({ elements }) => {
  return (
    <div className="card_div">
      <div className="user_info_div">
        <div className="user_icon">
          <Space wrap size={26}>
            <Avatar size={50} icon={<UserOutlined />} />
          </Space>
        </div>
        <div className="name_and_date">
          <div className="user_fullname">{elements.userName}</div>
          <div className="user_psot_Date">
            <p>{elements.date}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="user_post">
        <h3>{elements.userPost}</h3>
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
  );
};

export default PostCard;
