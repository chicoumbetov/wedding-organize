// functions:
const userControllers = require("../controllers/user.js");
// const auth = require('../middleware/auth.js');

const express = require("express");
const router = express.Router();

router.get('/', userControllers.getAllUsers)
router.get('/:id', userControllers.getOneUser)

module.exports = router;
