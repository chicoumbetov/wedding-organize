// import { combineReducers } from "redux";
import posts from './posts'
import auth from "./auth";
// import users from "./user";
import usersSlice from "../redux/usersSlice";

// export default combineReducers({ posts, auth, users })
export default { posts, auth, usersSlice }
