import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserById = createAsyncThunk(
  "userAuthentication/fetchUserByIdStatus",
  async (userId) => {
    const accessToken = localStorage.getItem("auth-token");
    const response = await axios.get(`http://localhost:5000/users/${userId}`, {
      headers: {
        "auth-token": `${accessToken}`,
      },
    });
    return response.data;
  }
);

const userByIdFetchSlice = createSlice({
  name: "userByIdFetch",
  initialState: {
    loading: false,
    hasErrors: false,
    user: null,
  },
  reducers: {
    resetUserState: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [fetchUserById.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchUserById.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { resetUserState } = userByIdFetchSlice.actions;

export default userByIdFetchSlice.reducer;
