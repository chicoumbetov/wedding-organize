import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {useDispatch} from "react-redux";

import {useNavigate} from "react-router-dom";
// import {createPost as createPostAction} from "../../redux/postsSlice";
import {createPostThunk} from "../../redux/thunk";
import {useAppSelector} from "../../store/hooks";
import {postSelector} from "../../store/selectors";

const Form = ({ currentId, setCurrentId }: any) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useNavigate();
    const reduxPost = useAppSelector(postSelector)// useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId): null)
    const user = JSON.parse(localStorage.getItem('profile') || '{}');
    console.log('user:', user)
    const [postData, setPostData] = useState({
        // creator: '', // tags: '',
        /**
        title: '', message: '',
        selectedFile: '',
        */
        // createdAt: string
        /**
        creator: '',
        name: '',
        _id: ''
        */
    })
    // console.log("post:", post)

    useEffect(() => {
        if(reduxPost) setPostData(reduxPost);
    }, [reduxPost])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        // console.log("event", event)
        if(currentId) {
            // dispatch(updatePost(currentId, postData)) // posts without user linking
            // dispatch(updatePost(currentId, { ...postData, name: user?.result?.name })) // posts linked to users
            clear();
            // console.log("disp:",dispatch(updatePost(currentId, postData)))
        } else {
            dispatch(createPostThunk({post: postData, history}))  // posts without user linking
            // dispatch(createPostAction({ ...postData, name: user?.result?.name },history)) // posts linked to users
            clear();
        }
        clear()
    }

    // if(!user?.result?.name) {
    if(!user?.username) {
        return (<Paper className={classes.paper}>
            <Typography variant={"h6"} align={"center"}>
                Please Sign In to create your own guests/memories and like other's memories.
            </Typography>
        </Paper>)
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            title: '', message: '',
            selectedFile: '',
            creator: '',
            name: '',
            _id: ''
        })
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete={"off"} noValidate
                  className={// classes.root,
                      classes.form}
                  onSubmit={(data)=> handleSubmit(data)}>
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
                    value={reduxPost?.title}
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
                    style={{ margin: '30px 0'}}
                    value={reduxPost?.message}
                    onChange={(event) => setPostData(
                        {
                            ...postData, message: event.target.value
                        }
                    )}
                />
                {/*
                <TextField
                    name={"tags"}
                    variant={"outlined"}
                    label={"Tags"}
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData(
                        {
                            ...postData, // tags: event.target.value.split(',')
                        }
                    )}
                />
                */}
                <div className={classes.fileInput}>
                    <FileBase64 type={"file"} multiple={false} onDone={({base64}: any) => setPostData(
                        { ...postData, selectedFile: base64}
                    )}/>
                </div>
                <div className={classes.buttonsForm}>
                    <Button className={`${classes.buttonSubmit} ${classes.button}`} variant={"contained"} color={"primary"} size={"large"} type={"submit"} fullWidth>Submit</Button>
                    <Button
                        className={classes.button}
                        onClick={() => clear()}
                        variant={"contained"} color={"secondary"} size={"small"} type={"reset"} fullWidth
                    >Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form;
