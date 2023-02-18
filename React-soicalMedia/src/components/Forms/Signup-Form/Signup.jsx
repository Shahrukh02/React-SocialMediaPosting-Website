import React, { useState } from "react";
import "./Signup.css";
import {app} from '../../../firebase-config'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

const Signup = () => {
  const [formData, setFromData] = useState({
    username : '',
    email: '',
    password : ''
  });

  const getValue = (event) => {
    let name = event.target.name
    let value = event.target.value

    setFromData((prev)=>{
      return {...prev , [name] : value}
    })
  }
  const auth = getAuth(app);

  const submission = (e) =>  {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential.user);
    setFromData({
      username : '',
      email: '',
      password : ''
    })
    // ...
  })
  .catch((error) => {
    console.log(error);
    // ..
  });
  }

  

  return (
    <>
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
            Already have an account <a href=".">sign in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
