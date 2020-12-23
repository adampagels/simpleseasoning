import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleRecipe = createAsyncThunk(
  "singleRecipeFetch/fetchSingleRecipesStatus",
  async (recipeId, thunkAPI) => {
    const accessToken = localStorage.getItem("auth-token");
    const response = await axios.get(
      `http://localhost:5000/recipes/${recipeId}`,
      {
        headers: {
          "auth-token": `${accessToken}`,
        },
      }
    );
    return response.data;
  }
);

const fetchSingleRecipeSlice = createSlice({
  name: "singleRecipeFetch",
  initialState: {
    loading: false,
    hasErrors: false,
    recipe: [],
  },
  reducers: {
    resetRecipeState: (state) => {
      state.recipe = null;
    },
  },
  extraReducers: {
    [fetchSingleRecipe.pending]: (state) => {
      state.loading = true;
    },
    [fetchSingleRecipe.fulfilled]: (state, { payload }) => {
      state.recipe = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchSingleRecipe.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { resetRecipeState } = fetchSingleRecipeSlice.actions;

export default fetchSingleRecipeSlice.reducer;
