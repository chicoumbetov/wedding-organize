import {createSlice} from "@reduxjs/toolkit";
/*
import {
    commentPost,
    createPost,
    deletePost,
    getPost,
    getPosts,
    getPostsBySearch,
    likePost,
    updatePost
} from "../actions/posts";
*/
import {END_LOADING, FETCH_ALL, FETCH_POST, START_LOADING} from "../constants/actionTypes";
import * as api from "../api";

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        /*
        getPost: (state, action) => {
            state.post = [ ...state, {id: state.post.id, post: action.payload} ]
        },
        */
        getPosts: (state, action, page) => async (dispatch) => {
            console.log('slicer posts:', state, action, page);
            const { data } = await api.fetchPosts(page);

            return{
                ...state,
                posts: data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        },
        /*
        getPostsBySearch,
        createPost,
        updatePost,
        likePost,
        commentPost,
        deletePost
         */
    }
})

export const {
    getPost, getPosts,
    getPostsBySearch, createPost, updatePost, likePost, deletePost
} = postsSlice.actions;

export default postsSlice.reducer
