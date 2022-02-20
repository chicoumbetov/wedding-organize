import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../api";

export const getPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (page) => {
        try {
            const { data } = await api.fetchPosts(page);
            // console.log("getPosts:", data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const getOnePost = createAsyncThunk(
    "posts/fetchOnePost",
    async (id) => {
        try {
            const { data } = await api.fetchPost(id);
            // console.log("data: ", data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const getPostsBySearch = createAsyncThunk(
    "posts/fetchPostsBySearch",
    async (searchQuery) => {
        const {data } = await api.fetchPostsBySearch(searchQuery);
        // console.log("fetch getPostsBySearch", data)
        return data
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: { isLoading: true, posts: [] },
    reducers: {
        fetchOnePost: (state, action) => {
            state.post = action.payload
        },
        fetchPosts(state, action, page) {
            // console.log('slicer posts:', state, action, page);
            state.posts = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages
        },
        fetchPostsBySearch(state, action) {
            state.posts = action.payload;
        },
        /*
        createPost,
        updatePost,
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
                // console.log("addCase action getPostsBySearch:", action);
                state.posts = action.payload;
            })
    }
})

export const {
    fetchOnePost, fetchPosts, fetchPostsBySearch,
    createPost, updatePost, likePost, deletePost
} = postsSlice.actions;

export default postsSlice.reducer
