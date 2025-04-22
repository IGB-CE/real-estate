const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        res.status(500).json(error.message)
    }
};

module.exports = { signup };
