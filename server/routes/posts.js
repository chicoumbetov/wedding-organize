import express from "express";

// functions:
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

// reached by localhost:5000/posts
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router