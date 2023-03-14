import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  // addDoc
} from "firebase/firestore";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
// } from "firebase/storage";
import { Avatar, Space } from "antd";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { app } from "../../firebase-config";
import Posts from "./Posts";
import PostBox from "../PostBox/PostBox";
import Loader from "../Loader-full-screen/Loader";

const Profile = ({ userUid }) => {
  const [userData, setUserData] = useState({});
  const [loaderComponent, setLoaderComponent] = useState(true);

  const db = getFirestore(app);
  // const storage = getStorage(app);

  const getDocumnet = async () => {
    const q = query(collection(db, "users"), where("userUid", "==", userUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserData(doc.data());
      setLoaderComponent(false);
    });
  };

  // const uploadImg = () => {
  //   const imageRef = ref(storage, `userProfile/${userUid} `);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then( async (url)=>{
  //       try {
  //         const docRef = await addDoc(collection(db, `users`), {
  //           profilePhoto: url
  //         });
  //         console.log("Document written with ID: ", docRef.id);
  //       } catch (e) {
  //         console.error("Error adding document: ", e);
  //       }
  //     })
  //   });
  // };

  

  useEffect(() => {
    getDocumnet();
  }, [userUid]);






  return loaderComponent !== false ? (
    <Loader />
  ) : (
    <div className="main_div">
      <div className="user_profile_box">
        <div className="user_profie_photo">
          <div className="avatar">
            <div className="upload_btn">
              {/* <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => setImageUpload(event.target.files[0])}
                />
                <PhotoCamera />
              </IconButton> */}
            </div>
            <Space wrap size={26}>
              <Avatar size={164} icon={userData.userName.split("")[0]} />
            </Space>
          </div>
          <div className="user_name">
            <h2>
              Name: <span className="user_info">{userData.userName}</span>
            </h2>
            <h3>
              Email: <span className="user_info">{userData.email}</span>
            </h3>
          </div>
        </div>
        {/* <button onClick={uploadImg}>upload</button> */}
      </div>
      <div className="create_post">
        <PostBox userName={userData.userName} userId={userUid} />
        <div className="all_users_post">
          <Posts userId={userUid} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
