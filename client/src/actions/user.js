import * as api from '../api'
import {FETCH_USERS, FETCH_ONE_USER, START_LOADING, END_LOADING} from "../constants/actionTypes";

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.getUsers()
        // console.log("data users:", data)

        const action = { type: FETCH_USERS, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING })
    } catch (e) {
        console.log(e)
    }
}

export const getOneUser = (id) => async (dispatch)=> {
    try {
        // console.log("getOneUser")
        const {data} = await api.getOneUser(id)
        // console.log("data one user:", data)
        const action = { type: FETCH_ONE_USER, payload: data };
        dispatch(action);
    } catch (e) {
        console.log(e)
    }
}

export const updateUser = () => async ()=> {
    try {
        console.log("updateUser")
    } catch (e) {
        console.log(e)
    }
}
