const User = require('../models/user.js');

exports.getAllUsers = async (req, res, next) => {
try {
    const users = await User.find()// .then(user => res.status(200).json(user))
    // .catch(error => res.status(400).json({ error }));
    console.log("users:", users)
    res.status(200).json({data: users})
} catch (e) {
    res.status(404).json({ message: e })
}

};

exports.getOneUser = (req, res, next) => {
    console.log("getOneUser", req.params)
    User.findOne({ _id: req.params.id }).then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

// module.exports = { signin, signup }
