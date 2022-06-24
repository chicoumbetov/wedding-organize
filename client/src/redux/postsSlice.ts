import {createSlice} from "@reduxjs/toolkit";
import {
    createPostThunk,
    getCommentThunk,
    getOnePostThunk,
    getPostsBySearch,
    getPostsThunk,
    getUsersThunk
} from "./thunk";

import initialState from "./state";
import {LOADING} from "../utils/status";
import {FETCH_USERS} from "../constants/actionTypes";

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        commentPostAct: (state, action) => ({
            ...state,
            posts: state.posts.map((post:any) => {
                // if (post._id === action.payload._id) return action.payload;
                if (post.id === action.payload.id) return action.payload;
                return post;
            }),
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, (state) => ({
                ...state,
                status: LOADING
            }))
            .addCase(getUsersThunk.fulfilled, (state, {payload} ) => ({
                ...state,
                ...payload,
                users: payload,
                status: FETCH_USERS
            }))

            .addCase(getPostsThunk.fulfilled, (state, { payload}) => ({
                ...state,
                posts: payload,
                // posts: action.payload,
                // currentPage: action.payload,
                // currentPage: action.payload.currentPage,
                // numberOfPages: action.payload.numberOfPages
                // numberOfPages: action.payload,
            }))
            .addCase(getCommentThunk.fulfilled, (state, { payload }) => ({
                ...state,
                comment: payload
            }))
            .addCase(getOnePostThunk.pending, (state) => ({
                ...state,
                status: LOADING
            }))
            .addCase(getOnePostThunk.fulfilled, (state, {payload}) => ({
                ...state,
                ...payload,
                post: payload
            }))
            .addCase(getPostsBySearch.pending, (state) => ({
                ...state,
                status: LOADING
            }))
            .addCase(getPostsBySearch.fulfilled, (state, {payload}) => ({
                ...state,
                posts: payload
            }))
            .addCase(createPostThunk.fulfilled, (state, action) => ({
                ...state,
                posts: action.payload
            }))



    }
})

export const {
    commentPostAct,
    // fetchOnePost, fetchPosts, fetchPostsBySearchAct,
    // createPost, updatePost, likePost, deletePost
} = postsSlice.actions;

export default postsSlice.reducer
