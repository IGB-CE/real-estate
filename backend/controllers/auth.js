const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(errorHandler(500, error.message))
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found!'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Invalid credentials!'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, {
            httpOnly: true,         // Cookie is inaccessible to JavaScript
            secure: true,           // Only sent over HTTPS
            sameSite: "None",       // Required for cross-site cookies
            maxAge: 1000 * 60 * 60 * 24, // 1 day expiry
        }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: req.body._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedpassword = bcrypt.hashSync(generatedPassword, 10)
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedpassword, avatar: req.body.photo })
            await newUser.save()
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, signin, google };
