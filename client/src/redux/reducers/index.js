import { combineReducers } from "redux";
import authenicateUser from "../slices/user/authenticateUser";
import fetchRecipes from "../slices/recipe/recipe";

export default combineReducers({
  authenicateUser,
  fetchRecipes,
});
