import React, { useEffect, useState } from "react";
import "./Login.css";
import { app } from "../../../firebase-config";
import {NavLink , useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import { Bars } from "react-loader-spinner";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/");
        // ...
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
    setLoading(true)
      e.preventDefault();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoading(false)
          setFromData({ email: "", password: "" });
          navigate('/')
        // ...
      })
      .catch((error) => {
        if (error == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Email',
          })
        }else if (error == 'FirebaseError: Firebase: Error (auth/internal-error).') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Internal Error',
          })
        }else if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Password',
          })
        }else if (error == 'FirebaseError: Firebase: Error (auth/user-not-found).') {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'User Not Found',
          })
        }
        console.log(error);
        setLoading(false)
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
           You dont have an account<NavLink to={'/auth/signup'}> sign up</NavLink>
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

export default Login;
