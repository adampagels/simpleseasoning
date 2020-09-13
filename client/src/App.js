import React from "react";
import Login from "../src/domain/Login/Login";
import Register from "../src/domain/Register/Register";
import Home from "../src/domain/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
