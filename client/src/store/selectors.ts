// import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";

export const statusSelector = (state: RootState) => state.wedApp.status;

export const usersSelector = (state: RootState) => state.wedApp.users;
export const userSelector = (state: RootState) => state.wedApp.user;
export const likesSelector = (state: RootState) => state.wedApp.likes;

export const postsSelector = (state: RootState) => state.wedApp.posts;
export const postSelector = (state: RootState) => state.wedApp.post;
export const selectComment = (state: RootState) => state.wedApp.comment;
export const currentPageSelector = (state: RootState) => state.wedApp.currentPage
export const numberOfPagesSelector = (state: RootState) => state.wedApp.numberOfPage

/**
export const filteredPostsSelector = createSelector(
    (state: RootState) => state.wedApp.posts,
    (state: RootState) => state.wedApp.search,
)
*/

export const filteredPostsSelector = (state: RootState) => state.wedApp.posts;
export const filteredSearchSelector =(state: RootState) => state.wedApp.search;
