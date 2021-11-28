// import { AUTH } from '../constants/actionTypes'

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user ...

        history('/')
    } catch (e) {
        console.log(e)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user ...

        history('/')
    } catch (e) {
        console.log(e)
    }
}