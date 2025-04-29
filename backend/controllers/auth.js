const User = require('../models/user');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// SIGNUP CONTROLLER
const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// SIGNIN CONTROLLER
const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(errorHandler(404, 'User not found!'));

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid credentials!'));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // ✅ important fix
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            path: '/', // ✅ THIS is required
        }).status(200).json(rest);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// GOOGLE SIGNIN CONTROLLER
const google = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                maxAge: 1000 * 60 * 60 * 24,
                path: '/', // ✅ THIS is required
            }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();

            // After creating user, find it again to get _id
            user = await User.findOne({ email: req.body.email });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                maxAge: 1000 * 60 * 60 * 24,
                path: '/', // ✅ THIS is required
            }).status(200).json(rest);
        }
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            path: '/', // ✅ THIS is required
        });
        res.status(200).json('User has been logged out!')
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}

module.exports = { signup, signin, google, signOut };
