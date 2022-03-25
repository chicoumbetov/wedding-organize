// functions:
const authControllers = require("../controllers/auth.js");

const express = require("express");
const router = express.Router();

router.post('/signin', authControllers.signin)
router.post('/signup', authControllers.signup)

module.exports = router;
