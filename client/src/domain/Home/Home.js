import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const accessToken = localStorage.getItem("auth-token");

  return (
    <>
      {!accessToken && <Redirect to="/login" />}
      <h1>Home</h1>
    </>
  );
};

export default Home;
