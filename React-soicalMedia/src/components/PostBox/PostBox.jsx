import React, { useState } from "react";
import "./PostBox.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { RotatingLines } from "react-loader-spinner";
import { app } from "../../firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const PostBox = ({ userName, userId }) => {
  const [textvalue, setTextValue] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const getTextValue = (event) => {
    let value = event.target.value;
    setTextValue(value);
  };

  const db = getFirestore(app);

  let d = new Date();
  const postAdd = async () => {
    setBtnLoader(true)
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userPost: textvalue,
        userName,
        userId,
        date: d.toLocaleDateString(),
        timeStamp: Date.now(),
      });
      setBtnLoader(false)
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTextValue("");
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
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
              placeholder={"What's on your mind, " + userName}
              value={textvalue}
              onChange={getTextValue}
            />
          </div>
          <button
            className={textvalue === "" ? "postbtndisable" : "postbtn"}
            disabled={textvalue === "" ? true : false}
            onClick={postAdd}
          >
            {btnLoader === false ? (
              "Post"
            ) : (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={btnLoader}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PostBox;
