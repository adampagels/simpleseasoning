import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  hasErrors: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loading = true;
    },
    loginUserSucess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasErrors = false;
      localStorage.setItem("auth-token", payload);
    },
    loginUserError: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { loginUser, loginUserSucess, loginUserError } = userSlice.actions;

export default userSlice.reducer;

export const fetchUsers = createAsyncThunk(
  "user/loginUser",
  async (form, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(loginUser());

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email: form.email,
        password: form.password,
      });
      const data = await response.data;
      // Set the data
      thunkAPI.dispatch(loginUserSucess(data));
    } catch (error) {
      // Set any errors while trying to fetch
      thunkAPI.dispatch(loginUserError());
      console.log(error.response);
    }
  }
);
