import React from "react";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-item-list">
        <li className="navbar-item">Home</li>
        <input type="text" placeholder="Find recipes"></input>
        <button type="submit">Search</button>
        <li className="navbar-item">Add Recipe</li>
        <li className="navbar-item">My Account</li>
      </ul>
    </div>
  );
};

export default NavBar;
