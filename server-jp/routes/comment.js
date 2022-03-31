const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");

router.post("/:id/comment", commentCtrl.createComment);
router.delete("/:id/comment/:id", auth, commentCtrl.deleteComment);
// router.post("/:id/addComment", commentCtrl.createComment);
// router.delete("/:id/deleteComment/:id", auth, commentCtrl.deleteComment);
router.get("/:id/listComments", commentCtrl.listComments);

module.exports = router;


