import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import {useNavigate} from "react-router-dom";

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useNavigate();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId): null)
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        // creator: '',
        title: '', message: '', tags: '', selectedFile: ''
    })
    // console.log("post:", post)

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log("event", event)
        if(currentId) {
            // dispatch(updatePost(currentId, postData)) // posts without user linking
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name })) // posts linked to users
            clear();
            // console.log("disp:",dispatch(updatePost(currentId, postData)))
        } else {
            // dispatch(createPost(postData))  // posts without user linking
            dispatch(createPost({ ...postData, name: user?.result?.name },history)) // posts linked to users
            clear();
        }
        clear()
    }

    if(!user?.result?.name) {
        return (<Paper className={classes.paper}>
            <Typography variant={"h6"} align={"center"}>
                Please Sign In to create your own guests/memories and like other's memories.
            </Typography>
        </Paper>)
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            // creator: '',
            title: '', message: '', tags: '', selectedFile: '' })
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete={"off"} noValidate className={[classes.root,classes.form]} onSubmit={(data)=> handleSubmit(data)}>
                <Typography variant={"h6"}>{currentId ? 'Editing' : 'Creating'} a post</Typography>
                {/**
                <TextField
                    name={"creator"}
                    variant={"outlined"}
                    label={"Full name"}
                    fullWidth
                    value={postData.creator}
                    onChange={(event) => setPostData(
                        {
                            ...postData, creator: event.target.value
                        }
                    )}
                />*/}
                <TextField
                    name={"title"}
                    variant={"outlined"}
                    label={"Post title"}
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData(
                        {
                            ...postData, title: event.target.value
                        }
                    )}
                />
                <TextField
                    name={"message"}
                    variant={"outlined"}
                    label={"Post description"}
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData(
                        {
                            ...postData, message: event.target.value
                        }
                    )}
                />
                <TextField
                    name={"tags"}
                    variant={"outlined"}
                    label={"Tags"}
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData(
                        {
                            ...postData, tags: event.target.value.split(',')
                        }
                    )}
                />
                <div className={classes.fileInput}>
                    <FileBase64 type={"file"} multiple={false} onDone={({base64}) => setPostData(
                        { ...postData, selectedFile: base64}
                    )}/>
                </div>
                <div className={classes.buttonsForm}>
                    <Button className={`${classes.buttonSubmit} ${classes.button}`} variant={"contained"} color={"primary"} size={"large"} type={"submit"} fullWidth>Submit</Button>
                    <Button className={classes.button} onClick={() => clear()} variant={"contained"} color={"secondary"} size={"small"} type={"clear"} fullWidth>Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form;
