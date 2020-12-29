import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { fetchUserId } from "../../redux/slices/user/fetchUserId";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const { loading, hasErrors, userId } = useSelector(
    (state) => state.fetchUserId
  );
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem("auth-token");
  };

  const accessToken = localStorage.getItem("auth-token");

  useEffect(() => {
    dispatch(fetchUserId(accessToken));
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
        <NavLink
          to={{ pathname: `/user/${userId && userId}`, state: { isIdFromNav: true } }}
        >
          <li className="navbar-item">View Profile</li>
        </NavLink>
        <SearchBar />
        <li className="navbar-item" onClick={() => logOut()}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
