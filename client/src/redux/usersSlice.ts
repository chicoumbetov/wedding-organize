import { createSlice} from '@reduxjs/toolkit';
import {getOneUserThunk, getUserLikesThunk, getUsersThunk} from "./thunk";
import {FETCH_LIKES, FETCH_ONE_USER, FETCH_USERS} from "../constants/actionTypes";
import {LOADING} from "../utils/status";

const usersSlice = createSlice({
    name: 'users',
    initialState: { isLoading: true, users: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOneUserThunk.pending, (state) => ({
                ...state,
                status: LOADING
            }))
            .addCase(getOneUserThunk.fulfilled, (state, {payload} ) => ({
                ...state,
                user: payload,
                status: FETCH_ONE_USER
            }))
            .addCase(getUserLikesThunk.fulfilled, (state, action ) => ({
                ...state,
                likes: action.payload,
                status: FETCH_LIKES
            }))
    }
})

// export const { } = usersSlice.actions;
export default usersSlice.reducer;
