import React from "react";
import useStyles from "./styles";
import {Button, Card, CardActions,  Typography} from "@material-ui/core";
// import moment from "moment";
import {MoreHoriz, ThumbUp} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";


const Guest = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const classes = useStyles();

    return(
        <Card className={classes.card}>
            {/**<CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>*/}
            {/**<div className={classes.overlay}>*/}

                {/** <Typography variant={"body2"}>{moment(post.createdAt).fromNow()}</Typography>*/}
            {/**</div>*/}
            <div className={classes.overlay2}>
                <Button style={{ color: 'black'}} size={"small"} onClick={() => {setCurrentId(post._id)}}>
                    <MoreHoriz />
                </Button>
            </div>
            <div style={{ display: 'flex', marginLeft: '20px', marginTop: '20px' }}>
                <Typography style={{ marginRight: '10px'}} variant={"h5"}>{post.creator}</Typography>
                &nbsp;
                <Typography variant={"h5"} className={classes.title} gutterBottom>{post.title}</Typography>
                &nbsp;
                <Typography variant={"h5"} component={"p"} gutterBottom>{post.message}</Typography>
                &nbsp;
                <Typography variant={"h5"} >{post.tags.map((tag) => ` ${tag} `)}</Typography>
            </div>
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

export default Guest;