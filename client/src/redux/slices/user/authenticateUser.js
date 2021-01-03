import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authenticateUser = createAsyncThunk(
  "userAuthentication/authenticateUserStatus",
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

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState: {
    loading: false,
    hasErrors: false,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [authenticateUser.pending]: (state) => {
      state.loading = true;
    },
    [authenticateUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
      state.hasErrors = false;
      localStorage.setItem("auth-token", payload.token);
    },
    [authenticateUser.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default userAuthenticationSlice.reducer;
