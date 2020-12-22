import { combineReducers } from "redux";
import authenicateUser from "../slices/user/authenticateUser";
import fetchRecipes from "../slices/recipe/recipe";
import fetchSingleRecipe from "../slices/recipe/fetchSingleRecipe";

export default combineReducers({
  authenicateUser,
  fetchRecipes,
  fetchSingleRecipe,
});
