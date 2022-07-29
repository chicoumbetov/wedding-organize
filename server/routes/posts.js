// controllers
const {
  getPostsBySearch,
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/posts.js");
const auth = require("../middleware/auth.js");

const express = require("express");
const router = express.Router();

// reached by localhost:5000/posts
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);
router.delete("/:id", auth, deletePost);

module.exports = router;
