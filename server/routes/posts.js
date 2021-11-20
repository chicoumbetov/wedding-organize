import express from "express";

// functions:
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

// reached by localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/likePost', likePost);
router.delete('/:id', deletePost)

export default router