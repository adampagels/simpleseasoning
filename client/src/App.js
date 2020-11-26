import React from "react";
import Routes from "./Routes";
import NavBar from "../src/components/NavBar/NavBar";
import { withRouter } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";

const App = ({ location }) => {
  const isLoggedIn =
    location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <div>
      {isLoggedIn && <SearchBar />}
      {isLoggedIn && <NavBar />}
      <Routes />
    </div>
  );
};

export default withRouter(App);
