import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null)

    const [postData, setPostData] = useState({
        creator: '',
        title: '', message: '',
        tags: '', selectedFile: ''
    })
    // console.log("post:", post)

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log("event", event)
        if(currentId) {
            dispatch(updatePost(currentId, postData))
            // console.log("disp:",dispatch(updatePost(currentId, postData)))
        } else {
            dispatch(createPost(postData))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete={"off"} noValidate className={`${classes.root} ${classes.form}`} onSubmit={(data)=> handleSubmit(data)}>
                <Typography variant={"h6"}>{currentId ? 'Editing' : 'Creating'} a guest</Typography>
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
                />
                <TextField
                    name={"title"}
                    variant={"outlined"}
                    label={"Number of persons"}
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
                    label={"Expenses X"}
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
                    label={"Expenses Y"}
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
                <Button className={classes.buttonSubmit} variant={"contained"} color={"primary"} size={"large"} type={"submit"} fullWidth>Submit</Button>
                <Button onClick={() => clear()} variant={"contained"} color={"secondary"} size={"small"} type={"clear"} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;