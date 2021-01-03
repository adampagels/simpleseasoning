import { combineReducers } from "redux";
import authenticateUser from "../slices/user/authenticateUser";
import fetchRecipeList from "../slices/recipe/fetchRecipeList";
import fetchSingleRecipe from "../slices/recipe/fetchSingleRecipe";
import addNewRecipe from "../slices/recipe/addNewRecipe";
import fetchUserById from "../slices/user/fetchUserById";

export default combineReducers({
  authenticateUser,
  fetchRecipeList,
  fetchSingleRecipe,
  fetchUserById,
  addNewRecipe,
});
