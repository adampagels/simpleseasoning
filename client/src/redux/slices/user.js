import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async (form, thunkAPI) => {
    const response = await axios.post("http://localhost:5000/users/login", {
      email: form.email,
      password: form.password,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    hasErrors: false,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.recipes = payload;
      state.loading = false;
      state.hasErrors = false;
      localStorage.setItem("auth-token", payload);
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default userSlice.reducer;
