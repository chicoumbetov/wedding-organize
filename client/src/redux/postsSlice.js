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
    "posts/getPostsBySearch",
    async (searchQuery) => {
        console.log("getPostsBySearch")
        const {data } = await api.fetchPostsBySearchAxios(searchQuery);
        console.log("fetch getPostsBySearch", data)
        return data
    }
)

export const createPostThunk = createAsyncThunk(
    "posts/createPost",
    async (post, history) => {
        const { data } = await api.createPost(post)
        history(`/posts/${data._id}`)
        console.log(data)
        return data.data
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
        fetchPostsBySearchAct(state, action) {
            console.log("fetchPostsBySearchAct")
            state.posts = action.payload;
        },
        createPost(state, action) {
            state.posts = [ ...state.posts, action.payload]
        },
        updatePost(state, action) {
            state.posts = state.posts.map((post) =>  post._id === action.payload._id ? action.payload : post)
        }
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
