import {createSelector} from "@reduxjs/toolkit";

export const userSelector = (state) => state.users.users

export const postSelector = (state) => state.posts.posts

export const filteredPostsSelector = createSelector(
    (state) => state.posts.posts,
    (state) => state.posts.search,
)
