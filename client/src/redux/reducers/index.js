import { combineReducers } from "redux";
import authenicateUser from "../slices/user/authenticateUser";
import fetchUserId from "../slices/user/fetchUserId";
import fetchRecipes from "../slices/recipe/recipe";
import fetchSingleRecipe from "../slices/recipe/fetchSingleRecipe";

export default combineReducers({
  authenicateUser,
  fetchRecipes,
  fetchSingleRecipe,
  fetchUserId,
});
