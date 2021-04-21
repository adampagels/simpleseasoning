import React, { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const NavBar = () => {
  const accessToken = localStorage.getItem("auth-token");
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("auth-token");
    history.push("/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.authenticateUser);

  const variants = {
    open: {
      opacity: 1,
      x: 0,
      width: "70%",
      height: "100%",
      borderRadius: 0,
      right: 0,
      bottom: 0,
    },
    closed: { opacity: 1 },
  };

  return (
    <>
      {!accessToken && <Redirect to="/login" />}
      <div className="navbar-container">
        <ul className="navbar-item-list">
          <div className="navbar-item-navlink-container">
            <li className="navbar-item">
              <NavLink to="/" className="navbar-item-navlink">
                Home{" "}
              </NavLink>
            </li>

            <li className="navbar-item">
              {" "}
              <NavLink to="/add-recipe" className="navbar-item-navlink">
                Add Recipe
              </NavLink>
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
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        style={{
          cursor: "pointer",
          width: 100,
          height: 100,
          backgroundColor: "#d54217",
          borderRadius: "100%",
          position: "fixed",
          zIndex: 20,
          bottom: 20,
          right: 20,
        }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        class="navbar-hamburgermenu"
      ></motion.nav>
    </>
  );
};

export default NavBar;
