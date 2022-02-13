import * as api from '../api'
import {CREATE, FETCH_ALL, UPDATE, DELETE,
    FETCH_BY_SEARCH,
    START_LOADING,  END_LOADING
} from '../constants/actionTypes'

// Action creators
export const getPosts = (page) => async (dispatch) => {
    try {
        // console.log("dispatch in")
        dispatch({ type: START_LOADING });
        // console.log("dispatch out")
        const { data } = await api.fetchPosts(page);
        // console.log("daaata", data)

        const action = { type: FETCH_ALL, payload: data }

        dispatch(action)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    console.log("getPostsBySearch searchQuery", searchQuery);
    try {
        dispatch({ type: START_LOADING });
        // const {data: { data }} = await api.fetchPostsBySearch(searchQuery.search);
        const {data: { data }} = await api.fetchPostsBySearch(searchQuery);

        // console.log("variableTest by search:", data)
        console.log("data by search:", data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("error:", error);
    }
};

/*
export const getPost = () => async (dispatch) => {
    try {
        console.log("getPost")
    } catch (error) {
        console.log("error:", error);
    }
}
 */

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data})
        dispatch({ type: END_LOADING })

    }  catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updatedPostData) => async (dispatch) => {
    // console.log("updatePost:", id, updatedPostData, dispatch)
    try {
        const { data } = await api.updatePost(id, updatedPostData)
        // console.log("uuuu,", data)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log("actions error:",error)
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log("actions error:",error)
    }
}
