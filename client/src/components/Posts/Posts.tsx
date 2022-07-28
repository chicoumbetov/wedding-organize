import React, { useEffect } from "react";
import Post from "./Post/Post";
import useStyles from "./styles";

import { CircularProgress, Grid } from "@material-ui/core";
import { getPostsThunk, getUserLikesThunk } from "../../redux/thunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  currentPageSelector,
  postsSelector,
  statusSelector,
} from "../../store/selectors";

const Posts = ({ setCurrentId }: { setCurrentId: any | null }) => {
  const reduxPosts = useAppSelector(postsSelector);
  const postsStatus = useAppSelector(statusSelector);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  console.log("postsStatus", postsStatus);

  useEffect(() => {
    dispatch(getPostsThunk(currentPageSelector));
    dispatch(getUserLikesThunk());
  }, [dispatch]);

  if (reduxPosts && !reduxPosts.data) return <>'No posts'</>; // && !isLoading) return 'No posts'

  return (
    <>
      {/**
             isLoading
             ? (<>
             <CircularProgress value={75} color={"primary"} />
             {/**<div>No posts yet</div>}
             </>)
             : (
             <Grid className={classes.mainContainer} container alignItems={"stretch"} spacing={3}>
             {
                      posts.data.map((post) => (
                          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                              <Post post={post} setCurrentId={setCurrentId} />
                          </Grid>
                      ))
                  }
             </Grid>)

             */}
      <Grid
        className={classes.mainContainer}
        container
        alignItems={"stretch"}
        spacing={3}
      >
        {reduxPosts.data ? (
          reduxPosts.data.map((post: any) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))
        ) : (
          <CircularProgress value={75} color={"primary"} />
        )}
      </Grid>
    </>
  );
};

export default Posts;
