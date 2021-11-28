import React from "react";
import Post from "./Post/Post";
import useStyles from './styles'
import {useSelector} from "react-redux";
import { Grid} from "@material-ui/core";


const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts )
    const classes = useStyles();

    // console.log("posts:", posts)

    return(
        !posts.length
            ? (<>
                {/**<CircularProgress value={75} color={"primary"} />*/}
                <div>No posts yet</div>
            </>)
            : (
              <Grid className={classes.mainContainer} container alignItems={"stretch"} spacing={3}>
                  {
                      posts.map((post) => (
                          <Grid key={post._id} item xs={12} sm={12}>
                              <Post post={post} setCurrentId={setCurrentId} />
                          </Grid>
                      ))
                  }
              </Grid>)
    )
}

export default Posts;