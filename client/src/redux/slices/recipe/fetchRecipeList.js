import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipeList = createAsyncThunk(
  "recipes/fetchRecipesStatus",
  async (token, thunkAPI) => {
    const response = await axios.get(
      "https://pinchofsalt-server.herokuapp.com/recipes/most-recent",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return response.data;
  }
);

const fetchRecipeListSlice = createSlice({
  name: "recipeListFetch",
  initialState: {
    loading: false,
    hasErrors: false,
    recipes: [],
  },
  reducers: {
    resetRecipeListState: (state) => {
      state.recipes = null;
    },
  },
  extraReducers: {
    [fetchRecipeList.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecipeList.fulfilled]: (state, { payload }) => {
      state.recipes = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchRecipeList.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { resetRecipeListState } = fetchRecipeListSlice.actions;

export default fetchRecipeListSlice.reducer;
