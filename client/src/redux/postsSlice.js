import {createSlice} from "@reduxjs/toolkit";
import {getOnePost, getPosts, getPostsBySearch} from "./thunk";

import initialState from "./state";

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchOnePost: (state, action) => ({
            ...state,
            post: action.payload
        }),
        fetchPostsAction: (state, action, page) => ({
            // console.log('slicer posts:', state, action, page);
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPage: action.payload.numberOfPages
        }),
        fetchPostsBySearchAction: (state, action) =>({
            ...state,
            posts: action.payload,
        }),
        createPostAction: (state, action) => ({
            ...state,
            posts: action.payload
        }),
        updatePostAction: (state, action) => ({
            state.posts = state.posts.map((post) =>  post._id === action.payload._id ? action.payload : post)
        })
        /*
        likePost,
        commentPost,
        deletePost
         */
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                // console.log("addCase action getPosts:", action);
                state.posts = action.payload;
                state.currentPage = action.payload.currentPage;
                state.numberOfPages = action.payload.numberOfPages
            })
            .addCase(getPosts.rejected, (state) => {
                state.isLoading = false
            })

            .addCase(getOnePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOnePost.fulfilled, (state, action) => {
                // console.log("addCase action getOnePost:", action);
                state.post = action.payload;
            })


            .addCase(getPostsBySearch.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getPostsBySearch.fulfilled, (state, action) => {
                console.log("addCase action getPostsBySearch:", action);
                state.posts = action.payload;
            })

            .addCase(createPostThunk.fulfilled, (state, action) => {
                console.log("addCase action createPost:", action);
                state.posts = action.payload
            })

    }
})

export const {
    fetchOnePost, fetchPosts, fetchPostsBySearchAct,
    createPost, updatePost, likePost, deletePost
} = postsSlice.actions;

export default postsSlice.reducer
