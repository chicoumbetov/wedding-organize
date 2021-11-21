import {Container, Grid, Grow} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import React, {useEffect, useState} from "react";
import useStyles from "../../styles";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";

const Home = () => {
    const classes = useStyles();
    const [ currentId, setCurrentId] = useState(null);


    const dispatch = useDispatch()
    // console.log("dispatch", dispatch(getPosts()))
    useEffect(()=> {
        dispatch(getPosts())
    }, [dispatch])


    return(
        <Grow in>
            <Container>
                <Grid className={classes.gridContainer} container justifyContent={"space-between"} alignItems={"stretch"} spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    {/**    Decomment when UI is finished
                     <Grid item xs={12} sm={7}>
                     <Guests setCurrentId={setCurrentId}/>
                     </Grid>*/}
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;