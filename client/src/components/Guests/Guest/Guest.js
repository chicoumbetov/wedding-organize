import React from "react";
import useStyles from "./styles";
import {Button, Typography} from "@material-ui/core";
// import moment from "moment";
import {DeleteOutline, ThumbUp, ThumbUpAltOutlined} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";


const Guest = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUp fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {/** post.likes.length === 1 ? 'Like' : 'Likes' */}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" /></>;
    };

    return(
        <div style={{ display: 'flex'}}>
            <div className={classes.card}>
                <div style={{ display: 'flex', flex: 1, marginLeft: '20px' }}>
                    <Typography onClick={() => {
                        if(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) setCurrentId(post._id)
                    }} style={{  width: '200px', marginRight: '10px'}} variant={"h6"}>{post.name}</Typography>
                    &nbsp;
                    <Typography variant={"h6"} className={classes.title} gutterBottom>{post.title}</Typography>
                    &nbsp;
                    <Typography variant={"h6"} className={classes.message} component={"p"} gutterBottom>{post.message}</Typography>
                    &nbsp;
                    <Typography variant={"h6"} className={classes.message}>{post.tags.map((tag) => ` ${tag} `)}</Typography>

                </div>
                <Button size={"small"} style={{ width: '50px'}} color={"default"} onClick={() => {
                    if(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) dispatch(deletePost(post._id))
                }}>
                    <DeleteOutline/>
                </Button>

            </div>
            <Button style={{ direction: 'column'}} size={"small"} color={"default"} onClick={() => dispatch(likePost(post._id))}>
                <Likes/>
            </Button>
        </div>
    )
}

export default Guest;
