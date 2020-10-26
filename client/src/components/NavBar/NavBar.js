import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-item-list">
        <NavLink to="/">
          <li className="navbar-item">Home</li>
        </NavLink>
        <input type="text" placeholder="Find recipes"></input>
        <button type="submit">Search</button>
        <NavLink to="/add-recipe">
          <li className="navbar-item">Add Recipe</li>
        </NavLink>
        <li className="navbar-item">My Account</li>
      </ul>
    </div>
  );
};

export default NavBar;
