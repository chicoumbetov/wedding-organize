import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    // res.send('This works !');
    try {
        const postMessages = await PostMessage.find()

        // console.log("postMessages:", postMessages)

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    // res.send('This works !');
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save()

        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })

    }

}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    console.log("iiiiiiiid updatePost:", _id)
    // from front end:
    const post = req.body;
    console.log("mongooose object id is valid?", mongoose.Types.ObjectId.isValid(_id))
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');


    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    try {
        res.status(202).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

}