import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addNewRecipeSlice = createSlice({
  name: "newRecipeAdd",
  initialState: {
    loading: false,
    hasErrors: false,
    recipeFormErrorMessage: [],
  },
  reducers: {
    removeRecipeFormErrorMessage: (state) => {
      state.errorMessage = [];
    },
    submitRecipe: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    submitRecipeSuccess: (state) => {
      state.loading = false;
    },
    submitRecipeFailure: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.recipeFormErrorMessage = payload;
    },
  },
  extraReducers: {},
});

export const {
  removeErrorMessage,
  submitRecipe,
  submitRecipeFailure,
  submitRecipeSuccess,
} = addNewRecipeSlice.actions;

export default addNewRecipeSlice.reducer;

export const addNewRecipe = createAsyncThunk(
  "recipes/addNewRecipeStatus",
  async (recipeForm, thunkAPI) => {
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
    thunkAPI.dispatch(submitRecipe());
    try {
      const response = await axios.post(
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
      thunkAPI.dispatch(submitRecipeSuccess(response.data));
    } catch (error) {
      thunkAPI.dispatch(submitRecipeFailure(error.response.data));
      console.log(error.response.data);
    }
  }
);
