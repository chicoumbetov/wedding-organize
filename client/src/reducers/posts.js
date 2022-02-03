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

const reducer = (posts = [], action) => {
    if(action && action.payload && posts) {
        // console.log("reducer id id:",posts, action.payload._id)
        // console.log("likes:",posts.likes)
        console.log("action:",action)
    }
    switch (action.type) {

        case CREATE:
            return [ ...posts, action.payload];
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_SEARCH:
            return action.payload;
        case UPDATE:
            return posts.map((post) =>  post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload._id);

        default:
            return posts;
    }
}

export default reducer
