import React from "react";
import "./App.css";
import Signup from "./components/Forms/Signup-Form/Signup";
import Login from "./components/Forms/Login-Form/Login";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts/AllPosts";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/profile" element={<Home />} />
      <Route path="/" element={<AllPosts />} />
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
