import React, { useEffect, useState } from "react";
import "./Signup.css";
import { app } from "../../../firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import Swal from 'sweetalert2'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const [formData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/auth/login");
        // ...
      } 
    });
  }, []);

  const getValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setFromData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const auth = getAuth(app);
  const db = getFirestore(app);

  const submission = (e) => {
    setLoading(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        try {
          const docRef = await addDoc(collection(db, "users"), {
            userName: formData.username,
            email: formData.email,
            userUid: user.uid,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        console.log(user.uid);
        setLoading(false);
        setFromData({ username: "", email: "", password: "" });

      })
      .catch((error) => {
        if(error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Email already in use',
          })
        }else if (error == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Password should be at least 6 characters',
          })
        }
        else if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Email',
          })
        }
        console.log(error);
        setLoading(false);
        // ..
      });
  };

  return (
    <>
      <div className="main">
        <div className="signup-form">
          <div className="container">
            <div className="header">
              <h1>Signup Account</h1>
            </div>
            <form onSubmit={submission}>
              <div className="input">
                <i className="fa-solid fa-user" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={getValue}
                />
              </div>
              <div className="input">
                <i className="fa-solid fa-envelope" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={getValue}
                />
              </div>
              <div className="input">
                <i className="fa-solid fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={getValue}
                />
              </div>
              <input className="signup-btn" type="submit" />
            </form>
            <p>
              Already have an account{" "}
              <NavLink to={"/auth/login"}>sign in</NavLink>
            </p>
            <div className="loader">
              <Bars
                height="50"
                width="50"
                color="#6366f1"
                ariaLabel="bars-loading"
                wrapperClass=""
                visible={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
