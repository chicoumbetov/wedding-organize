const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");


router.post("/:id/addlike", auth, likeCtrl.addLike);
// router.get("/:id/listlike", auth, likeCtrl.listLikes);
router.get("/:id/listlike", likeCtrl.listLikes);
router.delete("/:id/deletelike", likeCtrl.deleteLike);

module.exports = router;
