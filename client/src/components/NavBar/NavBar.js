import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [user, setUser] = useState("");

  const logOut = () => {
    localStorage.removeItem("auth-token");
  };

  const getUserId = () => {
    const accessToken = localStorage.getItem("auth-token");
    axios
      .get(`http://localhost:5000/users/`, {
        headers: {
          "auth-token": `${accessToken}`,
        },
      })
      .then((userData) => {
        setUser(userData.data._id);
      });
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <div className="navbar-container">
      <ul className="navbar-item-list">
        <NavLink to="/">
          <li className="navbar-item">Home</li>
        </NavLink>
        <NavLink to="/add-recipe">
          <li className="navbar-item">Add Recipe</li>
        </NavLink>
        <NavLink to={{ pathname: `/user/${user}`, userId: user }}>
          <li className="navbar-item">View Profile</li>
        </NavLink>
        <li className="navbar-item" onClick={() => logOut()}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
