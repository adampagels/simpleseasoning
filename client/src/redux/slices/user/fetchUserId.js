import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserId = createAsyncThunk(
  "userAuthentication/fetchUserIdStatus",
  async (accessToken, thunkAPI) => {
    const response = await axios.get(`http://localhost:5000/users/`, {
      headers: {
        "auth-token": `${accessToken}`,
      },
    });
    return response.data._id;
  }
);

const userIdFetchSlice = createSlice({
  name: "userIdFetch",
  initialState: {
    loading: false,
    hasErrors: false,
    userId: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUserId.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserId.fulfilled]: (state, { payload }) => {
      state.userId = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchUserId.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default userIdFetchSlice.reducer;
