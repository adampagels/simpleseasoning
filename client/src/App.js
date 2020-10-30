import React from "react";
import Routes from "./Routes";

import NavBar from "../src/components/NavBar/NavBar";
import { withRouter } from "react-router-dom";

const App = ({ location }) => {
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavBar />
      )}
      <Routes />
    </div>
  );
};

export default withRouter(App);
