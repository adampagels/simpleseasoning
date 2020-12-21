import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authenicateUser = createAsyncThunk(
  "user/authenicateUserStatus",
  async (form, thunkAPI) => {
    // If form contains username, then it is for registration
    const authEndpoint = form.username ? "register" : "login";

    const userLoginForm = { email: form.email, password: form.password };
    const userRegisterForm = {
      email: form.email,
      password: form.password,
      username: form.username,
    };
    const response = await axios.post(
      `http://localhost:5000/users/${authEndpoint}`,
      authEndpoint === "register" ? userRegisterForm : userLoginForm
    );
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
    [authenicateUser.pending]: (state) => {
      state.loading = true;
    },
    [authenicateUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasErrors = false;
      localStorage.setItem("auth-token", payload);
    },
    [authenicateUser.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default userSlice.reducer;
