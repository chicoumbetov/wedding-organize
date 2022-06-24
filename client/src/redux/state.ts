import {initStateProps} from "./interfaces";
import {IDLE} from "../utils/status";

const initialState: initStateProps = {
    posts: [],
    post: null,
    users: [],
    user: null,
    isLoading: true,
    currentPage: null,
    numberOfPage: 0,
    search: null,
    status: IDLE,
    comment: null,
    likes: []
};

export default initialState;
