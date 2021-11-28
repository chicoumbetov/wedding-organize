import {CREATE, DELETE, FETCH_ALL, UPDATE} from "../constants/actionTypes";

const reducer = (posts = [], action) => {
    if(action && action.payload && posts) {
        console.log("reducer id id:",posts, action.payload._id)
        console.log("likes:",posts.likes)
    }
    switch (action.type) {

        case CREATE:
            return [ ...posts, action.payload];
        case FETCH_ALL:
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