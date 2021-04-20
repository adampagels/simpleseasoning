import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState: {
    loading: false,
    hasErrors: false,
    errorMessage: [],
    user: null,
  },
  reducers: {
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
    removeErrorMessage: (state) => {
      state.errorMessage = [];
    },
    verifyUser: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    verifyUserSuccess: (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("auth-token", payload.token);
    },
    verifyUserFailure: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
  extraReducers: {},
});

export const {
  updateUser,
  removeErrorMessage,
  verifyUser,
  verifyUserFailure,
  verifyUserSuccess,
} = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;

export const authenticateUser = createAsyncThunk(
  "userAuthentication/authenticateUserStatus",
  async (form, thunkAPI) => {
    // If form contains username, then it is for registration
    const authEndpoint = form.page === "register" ? "register" : "login";

    const userLoginForm = { email: form.email, password: form.password };
    const userRegisterForm = {
      email: form.email,
      password: form.password,
      username: form.username,
    };
    thunkAPI.dispatch(verifyUser());
    try {
      const response = await axios.post(
        `https://pinchofsalt-server.herokuapp.com/users/${authEndpoint}`,
        authEndpoint === "register" ? userRegisterForm : userLoginForm
      );
      thunkAPI.dispatch(verifyUserSuccess(response.data));
    } catch (error) {
      thunkAPI.dispatch(verifyUserFailure(error.response.data));
    }
  }
);
