import * as api from "../api";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const signInThunk = createAsyncThunk(
    'auth/login',
    async ({email, password, history }:any) => {
        try {
            console.log('signInThunk')
            const {data: userData} = await api.signIn({email, password});
            localStorage.setItem('profile',JSON.stringify({...userData}))
            history('/posts/')
            console.log("sign In test:", userData)
        } catch (error: any) {
            const { errors } = error.response.data;
            console.log('error: ', errors)
            // return rejectWithValue(errors[Object.keys(errors)[0]][0]);
        }
    }
)

export const signUpThunk = createAsyncThunk(
    'auth/register',
    async ({formData, history}: any) => {
        try {
            console.log('signUpThunk')
            const { data } = await api.signUp(formData)
            history('/posts/')
            return data
        } catch (error: any) {
            const { errors } = error.response.data;
            console.log('error: ', errors)
            // return rejectWithValue(errors[Object.keys(errors)[0]][0]);
        }
    }
)

export const getPostsThunk = createAsyncThunk(
    "posts/fetchPosts",
    async (page:any) => {
        try {
            const { data } = await api.fetchPosts();
            return data
            /* mongo db server
            return {
                currentPage: data.currentPage,
                posts: data.posts,
                numberOfPages: data.numberOfPages
            }
            */
        } catch (e) {
            console.log('getPostsThunk error : ',e)
        }
    }
)

export const getOnePostThunk = createAsyncThunk(
    "posts/fetchOnePost",
    async ({id}: { id: string }) => {
        try {
            const { data } = await api.fetchOnePost(id);
            // const { data } = await api.fetchPost(id); // mongo
            return data
        } catch (e) {
            console.log(e)
        }
    }
)

export const getPostsBySearch = createAsyncThunk(
    "posts/getPostsBySearch",
    async ({searchQuery}: any) => {
        // console.log("getPostsBySearch",searchQuery )
        const {data } = await api.fetchPostsBySearchAxios(searchQuery);
        // console.log("fetch getPostsBySearch", data)
        return data
    }
)

export const createPostThunk = createAsyncThunk(
    "posts/createPost",
    async ({post, history}: any) => {
        const { data } = await api.createPost(post)
        console.log('')
        history(`/posts/${data._id}`) // mongo
        console.log(data)
        return data.data
    }
)

export const getCommentThunk = createAsyncThunk(
    'posts/comments',
    async () => {
        const {data} = await api.commentList();
        return data;
    }
)

export const getUserLikesThunk = createAsyncThunk(
    'users/likes',
    async () => {
        const { data } = await api.likesList()
        return data;
    }
)

// createAsyncThunk creates Action automatically
export const getUsersThunk = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        try {
            const {data} = await api.getUsers();
            return data;
        } catch (e) {
            console.log('getUsersThunk error: ',e);
        }
    }
)


export const getOneUserThunk = createAsyncThunk(
    "users/fetchOneUser",
    async ({id}: { id: number | string}) => {
        try {
            const {data} = await api.getOneUser(id);
            console.log('getOneUserThunk', data)
            return data;
        } catch (e) {
            console.log(e)
        }
    }
)

