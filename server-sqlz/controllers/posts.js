// const express = require('express');
const mongoose = require("mongoose");

const PostMessage = require("../models/post.js");
const CommentMessage = require("../models/comment.js");

// const router = express.Router();

exports.getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getPosts = async (req, res) => {
    const { page } = req.query;
    // res.send('This works !');
    try {
        const LIMIT = 3;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostMessage.countDocuments({})

        // skip all pages before the page that user have chosen
        const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex) // sort by newest posts first
        // console.log("postMessages:", posts)
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// query -> /page?page=1
// params -> /page/1
exports.getPostsBySearch = async (req, res) => {
    const {
        searchQuery,
        tags
    } = req.query;
    // console.log("searchQuery backend:", searchQuery);
    // console.log("searchQuery backend req:", req.query);
    // console.log("searchQuery backend req:", req);
    // console.log("searchQuery backend res:", res);
    try {
        const title = new RegExp(searchQuery, 'i'); // 'i' ignore case : Test, test, TEST -> will find any test variation
        console.log("title:", title);
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        // const posts = await PostMessage.find({ $or: [ { title } ]});
        // console.log("posts:", posts);
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

exports.createPost = async (req, res) => {
    // res.send('This works !');
    // const { title, message, selectedFile, creator, tags } = req.body;
    const post = req.body;

    // const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save()

        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })

    }
}

exports.updatePost = async (req, res) => {
    const { id: _id } = req.params;
    // console.log("iiiiiiiid updatePost:", _id)
    // from front end:
    const post = req.body;
    // console.log("mongooose object id is valid?", mongoose.Types.ObjectId.isValid(_id))
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    try {
        res.json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

exports.likePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated" })

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findByIdAndUpdate(_id);

    const index = post.likes.findIndex((id) => id === String(res.userId));

    if(index === -1) {
        // like the post
        if(post.likes.includes(req.userId)){
            // dislike a post
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        } else {
            post.likes.push(req.userId)
        }
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likes: post.likes }, { new: true })

    try {
        res.json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

exports.deletePost = async (req, res) => {
    const { id: _id } = req.params;
    // console.log("iiiiiiiid deletePost:", _id)

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(_id)

    try {
        res.json({ message: 'Post deleted successfully'})
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

}

exports.commentPost = async (req, res) => {
    console.log(req)
    const { id } = req.params;
    const { value } = req.body;
    console.log(id, ':', value)
    const post = await PostMessage.findById(id);
    const comment = await CommentMessage.findById(id);
    console.log(post)
    // post.comments.push(value);
    comment.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    console.log(updatedPost)
    try {
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

// module.exports = router;
