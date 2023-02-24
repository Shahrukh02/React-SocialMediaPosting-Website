import React, { useState } from "react";
import "./PostBox.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { app } from "../../firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

const PostBox = ({ userName , userId}) => {
  const [textvalue, setTextValue] = useState("");

  const getTextValue = (event) => {
    let value = event.target.value;
    setTextValue(value);
  };

  const db = getFirestore(app);

  let d = new Date
  const postAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userPost: textvalue,
        userName,
        userId,
        date: d.toLocaleDateString()
      });
      console.log("Document written with ID: ", docRef.id);
      setTextValue('')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <div className="post_box_div">
        <div className="create">
          <div className="createpost">Create Post</div>
          <div className="logo">
            <div className="profilepic setprofilepic">
              <Space wrap size={26}>
                <Avatar size={50} icon={<UserOutlined />} />
              </Space>
            </div>
            <div className="namelogoicon">
              <div className="name">{userName}</div>
            </div>
          </div>
          <div className="textarea">
            <textarea
              className="settextarea"
              placeholder="What's on your mind, Shahrukh"
              value={textvalue}
              onChange={getTextValue}
            />
          </div>
          <button
            className={textvalue === "" ? "postbtndisable" : "postbtn"}
            disabled={textvalue === "" ? true : false}
            onClick={postAdd}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default PostBox;
