const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token})
    } catch (e) {
        res.status(500).json({ message: 'Sign in error.', e})
        console.log(e)
    }
}

exports.signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, isAdmin, bio, avatar } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists."})

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match"})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, isAdmin: false, bio: "Bio", avatar: ""})

        // secretKey must be same as in middleware/auth.js
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" })

        res.status(200).json({ result: result, token})

    } catch (e) {
        res.status(500).json({ message: 'Sign up error.'})

        console.log(e)
    }
}
