import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserById = createAsyncThunk(
  "userAuthentication/fetchUserByIdStatus",
  async (userIdAndIdLocation, { getState }) => {
    const accessToken = localStorage.getItem("auth-token");
    const { isIdFromNav, userIdFromRecipe } = userIdAndIdLocation;
    const { userId: currentUserId } = getState().fetchUserId;

    const userIdParameter = isIdFromNav ? currentUserId : userIdFromRecipe;
    const response = await axios.get(
      `http://localhost:5000/users/${userIdParameter}`,
      {
        headers: {
          "auth-token": `${accessToken}`,
        },
      }
    );
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
  reducers: {},
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

export default userByIdFetchSlice.reducer;
