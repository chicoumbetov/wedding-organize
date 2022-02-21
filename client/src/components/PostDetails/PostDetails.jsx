import React, {useEffect} from 'react'

import useStyles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
// import {getPost, getPostsBySearch} from "../../actions/posts";
import { Divider, Paper, Typography} from "@material-ui/core";
import moment from "moment";
import CommentSection from "./CommentsSection";
import {getOnePost as getOnePostAction, getPostsBySearch as getPostsBySearchAction} from "../../redux/postsSlice";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => {
        // console.log("state?.postsSlice:", state?.postsSlice)
        return state?.postsSlice
    })
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        console.log("getOnePost", id)
        dispatch(getOnePostAction(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearchAction({
                search: 'none',
                tags: post?.tags.join(',')
            }));
        }
    }, [post, dispatch]);

    if (!post) return null;

    const openPost = (_id) => history(`/posts/${_id}`);

    /**
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }
    */

    // console.log("posts", posts.data)
    // console.log("post", post)
    let recommendedPosts;
    if(posts.data) {
        recommendedPosts = posts.data.filter(({ _id }) => _id !== post._id);
    } else {
        recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    }

    return(
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post}/>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img style={{ borderRadius: '5px' }} src={selectedFile} width="200px" alt={"file"}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails;
