import React from 'react'
import './Navbar.css'
import { app } from "../../firebase-config";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
    
    const auth = getAuth(app)
    const logoutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
  return (
    <>
     <div className='nav'>
        <div className="logo">
            <h1>Navbar</h1>
        </div>
        <div className="tabs">
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li><button className='logout-btn' onClick={logoutHandler}>Logout</button></li>
            </ul>
        </div>
     </div>
    </>
  )
}

export default Navbar
