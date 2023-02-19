import React, { useEffect, useState } from "react";
import "./Login.css";
import { app } from "../../../firebase-config";
import {NavLink , useNavigate} from 'react-router-dom'
// import Home from "../../Home/Home";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  
  let navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/page/home");
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
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.uid);
          setFromData({ email: "", password: "" });
          navigate('/page/home')
        // ...
      })
      .catch((error) => {
        console.error(error);
        alert(error)
        // ..
      });
  };

  return (
    <>
     <div className="main">
     <div className="login-form">
        <div className="container">
          <div className="header">
            <h1>Login Account</h1>
          </div>
          <form onSubmit={submission}>
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
            <input className="login-btn" type="submit" />
          </form>
          <p>
           You dont have an account<NavLink to={'/auth/signup'}>sign up</NavLink>
          </p>
        </div>
      </div>
     </div>
    </>
  );
};

export default Login;
