import React from "react";
import Post from "./Post/Post";
import useStyles from './styles'
import {useSelector} from "react-redux";
import {CircularProgress, Grid} from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => {
        // console.log("state.postsSlice", state?.postsSlice)
        return state?.postsSlice
    });
    const classes = useStyles();

    // console.log("posts:", posts)
    if(!posts?.length && !isLoading) return 'No posts'

    return(
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
            <Grid className={classes.mainContainer} container alignItems={"stretch"} spacing={3}>
                {
                    (posts && posts.data)
                        ? posts.data.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                                <Post post={post} setCurrentId={setCurrentId} />
                            </Grid>
                        ))
                        : <CircularProgress value={75} color={"primary"} />
                }
            </Grid>
        </>
    )
}

export default Posts;
