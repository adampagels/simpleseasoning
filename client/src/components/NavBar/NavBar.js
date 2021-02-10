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
            <li className="navbar-item">
              <NavLink to="/" className="navbar-item-navlink">Home </NavLink>
            </li>

            <li className="navbar-item">
              {" "}
              <NavLink to="/add-recipe" className="navbar-item-navlink">Add Recipe</NavLink>
            </li>

            <li className="navbar-item">
              {" "}
              <NavLink
                to={{
                  pathname: `/user/${user && user._id}`,
                  state: { isIdFromNav: true },
                }}
                className="navbar-item-navlink"
              >
                View Profile
              </NavLink>
            </li>
          </div>
          <SearchBar />
          <li className="navbar-item-logout" onClick={() => logOut()}>
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
