import * as api from '../api'
import {
    CREATE, UPDATE, DELETE,
    // FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST,
    START_LOADING, END_LOADING,  COMMENT
} from '../constants/actionTypes'

// Action creators
/**
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        const action = { type: FETCH_POST, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message)
    }
}

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
    // console.log("getPostsBySearch searchQuery", searchQuery);
    try {
        dispatch({ type: START_LOADING });
        // const {data: { data }} = await api.fetchPostsBySearch(searchQuery.search);
        const {data: { data }} = await api.fetchPostsBySearchAxios(searchQuery);

        // console.log("variableTest by search:", data)
        // console.log("data by search:", data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("error:", error);
    }
};
*/

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(post)
        history(`/posts/${data._id}`)

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

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        console.log("comment:", data)
        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};
