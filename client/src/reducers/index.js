// import { combineReducers } from "redux";
// import posts from './posts'
// import users from "./user";
import auth from "./auth";
import usersSlice from "../redux/usersSlice";
import postsSlice from "../redux/postsSlice";

// export default combineReducers({ posts, auth, users })
export default { postsSlice, auth, usersSlice }
