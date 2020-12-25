import { combineReducers } from "redux";
import authenicateUser from "../slices/user/authenticateUser";
import fetchUserId from "../slices/user/fetchUserId";
import fetchRecipeList from "../slices/recipe/fetchRecipeList";
import fetchSingleRecipe from "../slices/recipe/fetchSingleRecipe";
import fetchUserById from "../slices/user/fetchUserById";

export default combineReducers({
  authenicateUser,
  fetchRecipeList,
  fetchSingleRecipe,
  fetchUserId,
  fetchUserById,
});
