import React, { useRef, useState } from "react";

// import { useDispatch } from "react-redux";

import { Button, TextField, Typography } from "@material-ui/core";
// import { commentPost } from "../../actions/posts";
import { postProps } from "../../redux/interfaces";
import { useAppSelector } from "../../store/hooks";
import { selectComment } from "../../store/selectors";
import useStyles from "./styles";

const CommentSection = ({ post }: { post: postProps }) => {
  console.log("post comments:", post?.comments);
  const user = JSON.parse(localStorage.getItem("profile") || "{}");
  const reduxComment = useAppSelector(selectComment);
  const [comment, setComment] = useState("");
  // const dispatch = useDispatch();
  const [
    comments,
    // setComments
  ] = useState(post?.comments); // (post?.comments); // mongo db
  const classes = useStyles();
  const commentsRef = useRef<HTMLDivElement>(null);
  console.log("redux comment:", reduxComment);

  const handleComment = async () => {
    console.log("handleComment", post._id, user.result.name, comment);
    /*
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );
    */

    setComment("");
    // setComments(newComments);

    if (commentsRef?.current) {
      commentsRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        {user && // && user.result && user.result.name && (
          user.username && (
            <div style={{ flex: "100%" }}>
              <Typography gutterBottom variant="h6">
                Write a comment
              </Typography>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment.length}
                color="primary"
                variant="contained"
                onClick={handleComment}
              >
                Comment
              </Button>
            </div>
          )}
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments &&
            comments.map((comm: number, i: any) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <div>{comm?.toString() /*content*/}</div>
                {/**
                             <strong>{comm?.split(': ')[0]}</strong>
                             {comm?.split(':')[1]}
                             */}
              </Typography>
            ))}
          <div ref={commentsRef} />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
