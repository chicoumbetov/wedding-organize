import { createSlice } from "@reduxjs/toolkit";
import { LOADING, SUCCESS_CHECK } from "../utils/status";
import { signInThunk } from "./thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => ({
        ...state,
        status: LOADING,
      }))
      .addCase(signInThunk.fulfilled, (state, { payload }) => ({
        ...state,
        status: SUCCESS_CHECK,
        user: payload,
      }));
  },
});

export default authSlice;
