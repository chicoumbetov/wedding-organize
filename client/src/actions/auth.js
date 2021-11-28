import { AUTH } from '../constants/actionTypes'
import * as api from "../api/index.js"

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user ...
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })

        history('/')
    } catch (e) {
        console.log(e)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user ...
        const { data } = await api.signUp(formData)
        console.log("data:", data)

        dispatch({ type: AUTH, data })

        history('/')
    } catch (e) {
        console.log(e)
    }
}