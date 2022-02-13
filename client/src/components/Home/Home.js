import {AppBar, Container, Grid, Grow, TextField} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import React, { useState} from "react";
import useStyles from "../../styles";
import {useDispatch} from "react-redux";
import { getPostsBySearch} from "../../actions/posts";
import Paginate from "../Pagination";
import { useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
// import Guests from "../Guests/Guests";
// import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [ currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    // const searchQuery = query.get('searchQuery');
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    // const [tags, setTags] = useState([]);
    // console.log("dispatch", dispatch(getPosts()))
    /**
    useEffect(()=> {
        dispatch(getPosts())
    }, [dispatch])
     */

    const searchPost = () => {
        // if (search.trim() || tags) {
        console.log("search post:", search)
        if (search.trim()) {
            dispatch(getPostsBySearch({ search }));
            // dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history(`/posts/search?searchQuery=${search || 'none'}`);
            // history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history('/');
        }
    };

    const handleKeyPress = (e) => {
        // e.keyCode - enter key
        if(e.keyCode === 13) {
            // search post
            searchPost();
            console.log("handleKeyPress");
        }
    }

    // const handleAddTag = (tag) => setTags([...tags, tag])

    // const handleDeleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    return(
        <Grow in>
            <Container maxWidth={"xl"}>
                {/** gridContainer style is empty for instant*/}
                <Grid className={classes.gridContainer} container justifyContent={"space-between"} alignItems={"stretch"} spacing={3}>
                    {/**
                     <Grid item xs={12} sm={7}>
                        <Guests setCurrentId={setCurrentId}/>
                     </Grid>
                    */}
                    <Grid item xs={12}
                          // sm={4}
                    >
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
                <AppBar className={classes.appBarSearch} position={"static"} color={"inherit"}>
                    <TextField
                        name={"search"}
                        variant={"outlined"}
                        label={"Search Post"}
                        fullWidth
                        onKeyPress={handleKeyPress}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    {/**<ChipInput
                        style={{ margin: '10px 0'}}
                        value={tags}
                        onAdd={handleAddTag}
                        onDelete={handleDeleteTag}
                        label="Search tags"
                        variant="outlined"
                     />*/}
                    <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar>
                <Paginate page={page}/>
                <Grid item xs={12}
                      // sm={7}
                >
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
