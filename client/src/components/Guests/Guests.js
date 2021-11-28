import React from "react";
import useStyles from './styles'
import {useSelector} from "react-redux";
import {Card, CircularProgress, Grid, Typography} from "@material-ui/core";
import Guest from "./Guest/Guest";


const Guests = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts )
    const classes = useStyles();

    // console.log("posts:", posts)

    return(
        !posts.length
            ? <CircularProgress value={75} color={"primary"} />
            : (
                <Grid className={classes.mainContainer} container alignItems={"stretch"} >
                    <div className={classes.card}>
                        <div style={{ display: 'flex', marginLeft: '20px', marginTop: '20px' }}>
                            <Typography style={{ width: '200px', marginRight: '10px'}} variant={"h6"}>Name</Typography>
                            &nbsp;
                            <Typography variant={"h6"} className={[classes.title]} gutterBottom>Guests</Typography>
                            &nbsp;
                            <Typography variant={"h6"} component={"p"} gutterBottom className={classes.message}>RON</Typography>
                            &nbsp;
                            <Typography variant={"h6"} className={classes.message}>RON</Typography>
                        </div>
                    </div>
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