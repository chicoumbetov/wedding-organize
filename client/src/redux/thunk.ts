import * as api from "../api";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (page) => {
        try {
            console.log("page: ", page)
            const { data } = await api.fetchPosts(0);
            console.log("getPosts:", data)
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
