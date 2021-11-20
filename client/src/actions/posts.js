import * as api from '../api'

// Action creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        // console.log("daaata", data)

        const action = { type: 'FETCH_ALL', payload: data }

        dispatch(action)
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
     const { data } = await api.createPost(post)

     dispatch({ type: 'CREATOR', payload: data})
    }  catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updatedPostData) => async (dispatch) => {
    // console.log("updatePost:", id, updatedPostData, dispatch)
    try {
        const { data } = await api.updatePost(id, updatedPostData)
        console.log("uuuu,", data)
        dispatch({ type: 'UPDATE', payload: data })
    } catch (error) {
        console.log("actions error:",error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({ type: 'DELETE', payload: id })
    } catch (error) {
        console.log("actions error:",error)
    }
}