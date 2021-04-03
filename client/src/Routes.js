import React from "react";
import Login from "../src/domain/Login/Login";
import Register from "../src/domain/Register/Register";
import Home from "../src/domain/Home/Home";
import Profile from "../src/domain/Profile/Profile";
import Recipe from "../src/domain/Recipe/Recipe";
import RecipeForm from "./domain/RecipeForm/RecipeForm";
import SearchResults from "./domain/SearchResults/SearchResults";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Routes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/user/:userid"
          exact
          component={Profile}
          key={window.location.pathname}
        />
        <Route path="/recipe/:recipeid" exact component={Recipe} />
        <Route path="/search/:searchresults" exact component={SearchResults} />
        <Route path="/add-recipe" exact component={RecipeForm} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
