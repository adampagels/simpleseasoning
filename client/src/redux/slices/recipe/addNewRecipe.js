import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewRecipe = createAsyncThunk(
  "recipes/addNewRecipeStatus",
  async (recipeForm) => {
    const accessToken = localStorage.getItem("auth-token");
    const {
      title,
      photo,
      description,
      ingredients,
      instructions,
      cookTime,
      prepTime,
      dietArray,
    } = recipeForm;
    await axios.post(
      "http://localhost:5000/recipes",
      {
        title: title,
        photo: photo,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        cookTime: cookTime,
        prepTime: prepTime,
        diet: dietArray,
      },
      {
        headers: {
          "auth-token": `${accessToken}`,
          "Content-type": "application/json",
        },
      }
    );
    return;
  }
);

const addNewRecipeSlice = createSlice({
  name: "newRecipeAdd",
  initialState: {
    loading: false,
    hasErrors: false,
  },
  reducers: {},
  extraReducers: {
    [addNewRecipe.pending]: (state) => {
      state.loading = true;
    },
    [addNewRecipe.fulfilled]: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    [addNewRecipe.rejected]: (state, error) => {
      state.loading = false;
      state.hasErrors = true;
      console.log(error);
    },
  },
});

export default addNewRecipeSlice.reducer;
