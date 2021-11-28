import React from "react";
import useStyles from "./styles";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import moment from "moment";
import {MoreHoriz, ThumbUp} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";
import {Skeleton} from "@mui/material";


const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    console.log("post.name:", post)
    return(
        <Card className={classes.card}>
            {post ? (
                <>
                    <CardMedia className={classes.media}
                               image={post.selectedFile  || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
                    <div className={classes.overlay}>
                        <Typography variant={"h6"}>{post.name}</Typography>
                        <Typography variant={"body2"}>{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                </>
            ) : (<Skeleton className={classes.media}/>)}
            <div className={classes.overlay2}>
                <Button style={{ color: 'white'}} size={"small"} onClick={() => {setCurrentId(post._id)}}>
                    <MoreHoriz />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant={"body2"} color={"textSecondary"}>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography variant={"h5"} className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant={"body2"} color={"textSecondary"} component={"p"} gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size={"small"} color={"primary"} onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUp/> &nbsp; Like &nbsp; {post.likeCount}
                </Button>
                <Button size={"small"} color={"primary"} onClick={() => dispatch(deletePost(post._id))}>
                    Delete
                </Button>
            </CardActions>

        </Card>
    )
}

export default Post;