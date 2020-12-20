import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  hasErrors: false,
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    getRecipes: (state) => {
      state.loading = true;
    },
    getRecipesSuccess: (state, { payload }) => {
      state.recipes = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getRecipesError: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getRecipes,
  getRecipesSuccess,
  getRecipesError,
} = recipeSlice.actions;

export default recipeSlice.reducer;

export const fetchRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (token, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getRecipes());
    try {
      const response = await axios.get(
        "http://localhost:5000/recipes/most-recent",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      const data = await response.data;
      // Set the data
      thunkAPI.dispatch(getRecipesSuccess(data));
    } catch (error) {
      // Set any errors while trying to fetch
      thunkAPI.dispatch(getRecipesError());
      console.log(error.response);
    }
  }
);
