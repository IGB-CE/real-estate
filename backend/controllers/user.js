const express = require("express");
const userModel = require("../models/user.js")
const path = require("path");
const app = express();
const bcryptjs = require('bcryptjs');
const User = require("../models/user.js");
const errorHandler = require("../utils/error.js");
const Listing = require("../models/listing.js");

const updateUser = async (req, res, next) => {
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

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            path: '/', // ✅ THIS is required
        });
        res.status(200).json({ message: 'User has been deleted!' })
    } catch (error) {
        next(errorHandler(500, error.message))
    }
}

const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id })
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings!'))
    }
}

const test = (req, res) => {
    res.json({
        message: 'Api is working'
    });
}

module.exports = { test, updateUser, deleteUser, getUserListings }