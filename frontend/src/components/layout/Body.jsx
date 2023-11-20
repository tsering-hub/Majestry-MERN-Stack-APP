import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Body;
