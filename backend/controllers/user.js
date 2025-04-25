const express = require("express");
const userModel = require("../models/user.js")
const path = require("path");
const app = express();
const bcryptjs = require('bcryptjs');
const User = require("../models/user.js");

const profileUpdate = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.file ? req.file.filename : undefined
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}

const test = (req, res) => {
    res.json({
        message: 'Api is working'
    });
}

module.exports = { test, profileUpdate }