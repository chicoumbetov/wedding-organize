import React, {useEffect} from 'react'

import useStyles from "./styles";
import {useNavigate, useParams} from "react-router-dom";
import { Divider, Paper, Typography} from "@material-ui/core";
import moment from "moment";
import {
    getCommentThunk, getOnePostThunk, getPostsBySearch
} from "../../redux/thunk";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {postSelector, postsSelector, selectComment} from "../../store/selectors";
import CommentSection from "./CommentsSection";

const PostDetails = () => {
    const reduxPost = useAppSelector(postSelector);
    const reduxPosts = useAppSelector(postsSelector);
    const reduxComment = useAppSelector(selectComment)
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const history = useNavigate();

    const { id } = useParams();
    console.log("useParams : ", id)

    useEffect(() => {
        if (id) {
            dispatch(getOnePostThunk({ id }))
        }
        dispatch(getCommentThunk())
        dispatch(getPostsBySearch(id));
    }, [id, dispatch]);
    console.log('reduxComment:', reduxComment);
    useEffect(() => {
        if (reduxPost) {
            dispatch(getPostsBySearch({
                search: 'none',
                tags: reduxPost?.tags?.join(',')
            }));
        }
    }, [reduxPost, dispatch]);

    if (!reduxPost) return null;

    const openPost = (_id: number) => history(`/posts/${_id}`);

    /**
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }
    */

    console.log("posts", reduxPosts)
    console.log("post", reduxPost)
    let recommendedPosts;
    if(reduxPosts) {
        // recommendedPosts = reduxPosts?.filter(({ _id }) => _id !== reduxPost._id);
        // @ts-ignore
        recommendedPosts = reduxPosts?.filter(({ _id }) => _id !== reduxPost.id);
    } else {
        // recommendedPosts = reduxPosts?.filter(({ _id }) => _id !== reduxPost._id);
        // @ts-ignore
        recommendedPosts = reduxPosts?.filter(({ _id }) => _id !== reduxPost.id);
    }

    return(
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{reduxPost.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{reduxPost?.tags?.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{reduxPost.message}</Typography>
                    <Typography variant="h6">Created by: {reduxPost.name}</Typography>
                    <Typography variant="body1">{moment(reduxPost.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />

                     <CommentSection post={reduxPost}/>

                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={reduxPost.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={reduxPost.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }: any) => (
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
