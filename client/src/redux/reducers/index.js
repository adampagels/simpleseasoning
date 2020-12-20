import { combineReducers } from "redux";
import fetchUsers from "../slices/user";
import fetchRecipes from "../slices/recipe";

export default combineReducers({
  fetchUsers,
  fetchRecipes,
});
