import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from "../api";

// createAsyncThunk creates Action automatically
export const getUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
                    try {
                        const {data} = await api.getUsers();
                        // console.log("data: ", data.data)
                        return data.data;
                    } catch (e) {
                        console.log(e)
                    }
                 }
)

export const getOneUser = createAsyncThunk(
    "users/fetchOneUser",
    async (id) => {
                    try {
                        const {data} = await api.getOneUser(id)
                        return data.data;
                    } catch (e) {
                        console.log(e)
                    }
                 }
)


const usersSlice = createSlice({
    name: 'users',
    initialState: { isLoading: true, users: [] },
    reducers: {
        fetchUsers(state, action) {
            state.users.push(action.payload);
        },
        fetchOneUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action ) => {
                // assign promise to result
                // console.log("action.pay", action.payload)
                state.users = action.payload
                // state.users.push(action.payload)
            })
            .addCase(getOneUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneUser.fulfilled, (state, action ) => {
                // assign promise to result
                state.user = action.payload
            })
    }
})

export const { fetchUsers, fetchOneUser } = usersSlice.actions;
export default usersSlice.reducer;
