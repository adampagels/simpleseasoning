import React from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const accessToken = localStorage.getItem("auth-token");
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("auth-token");
    history.push("/login");
  };
  const { user } = useSelector((state) => state.authenticateUser);

  return (
    <>
      {!accessToken && <Redirect to="/login" />}
      <div className="navbar-container">
        <ul className="navbar-item-list">
          <div className="navbar-item-navlink-container">
            <NavLink to="/">
              <li className="navbar-item">Home</li>
            </NavLink>
            <NavLink to="/add-recipe">
              <li className="navbar-item">Add Recipe</li>
            </NavLink>
            <NavLink
              to={{
                pathname: `/user/${user && user._id}`,
                state: { isIdFromNav: true },
              }}
            >
              <li className="navbar-item">View Profile</li>
            </NavLink>
          </div>
          <SearchBar />
          <li className="navbar-item" onClick={() => logOut()}>
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
