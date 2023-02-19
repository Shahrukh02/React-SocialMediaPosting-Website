import React, { useEffect, useState } from "react";
import "./Signup.css";
import { app } from "../../../firebase-config";
import {NavLink, useNavigate } from 'react-router-dom'
// import Login from "../Login-Form/Login";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Signup = () => {
  const [formData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/");
        // ...
      } else {
        console.log("none");
      }
    });
  },[])

  const getValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setFromData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const auth = getAuth(app);

  const submission = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setFromData({ username: "", email: "", password: "" });
        
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
        alert(error)
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
            Already have an account <NavLink to={'/auth/login'}>sign in</NavLink>
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
