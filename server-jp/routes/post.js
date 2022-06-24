const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");


router.post("/create", auth, multer, postCtrl.createPost);
router.get("/", postCtrl.listPosts);
router.get("/:id", auth, postCtrl.getPost);

router.put("/update/:id", auth, multer, postCtrl.updatePost);
router.delete("/delete/:id", auth, postCtrl.deletePost);

// React Redux frontend
router.get("/:id", postCtrl.getPost);



module.exports = router;
