import React from "react";
import useStyles from './styles'
import {useSelector} from "react-redux";
import {CircularProgress, Grid} from "@material-ui/core";
import Guest from "./Guest/Guest";


const Guests = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts )
    const classes = useStyles();

    // console.log("posts:", posts)

    return(
        !posts.length
            ? <CircularProgress value={75} color={"primary"} />
            : (
                <Grid className={classes.mainContainer} container alignItems={"stretch"} spacing={3}>
                    {
                        posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12}>
                                <Guest post={post} setCurrentId={setCurrentId} />
                            </Grid>
                        ))
                    }
                </Grid>)
    )
}

export default Guests;