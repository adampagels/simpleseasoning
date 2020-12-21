import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipesStatus",
  async (token, thunkAPI) => {
    const response = await axios.get(
      "http://localhost:5000/recipes/most-recent",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return response.data;
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    loading: false,
    hasErrors: false,
    recipes: [],
  },
  reducers: {},
  extraReducers: {
    [fetchRecipes.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecipes.fulfilled]: (state, { payload }) => {
      state.recipes = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchRecipes.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default recipeSlice.reducer;
