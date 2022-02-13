import {
    CREATE,
    DELETE,
    // END_LOADING,
    FETCH_ALL,
    FETCH_BY_SEARCH,
    // FETCH_POST,
    // START_LOADING,
    UPDATE
} from "../constants/actionTypes";

const reducer = (state = [], action) => {
    if(action && action.payload && state) {
        // console.log("reducer id id:",state, action.payload._id)
        // console.log("likes:",state.likes)
        // console.log("action:",action)
    }
    switch (action.type) {

        case CREATE:
            return [ ...state, action.payload];
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return { ...state, state: action.payload };
        case UPDATE:
            return state.map((post) =>  post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return state.filter((post) => post._id !== action.payload._id);

        default:
            return state;
    }
}

export default reducer
