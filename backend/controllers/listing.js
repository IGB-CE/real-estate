const express = require("express");
const Listing = require('../models/listing.js');

const createListing = async (req, res, next) => {
    try {
        const listing = Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

module.exports = { createListing }