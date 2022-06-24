import React from 'react';

const Post = (props) => {
    const {post} = props
    console.log(post);
    return (
        <div className="post">
            <h1 className="post__titre">{post.title}</h1>
            <p className="post__texte">{post.content}</p>
            <img src={post.attachment}></img>
        </div>
    );
};

export default Post;