const express = require("express");
const Listing = require('../models/listing.js');
const errorHandler = require("../utils/error.js");

const createListing = async (req, res, next) => {
    try {
        console.log(req.body);

        // Parse fields to correct types (checking for existence before parsing)
        const parsedBody = {
            ...req.body,
            sell: req.body.sell === 'true',
            rent: req.body.rent === 'true',
            parking: req.body.parking === 'true',
            furnished: req.body.furnished === 'true',
            offer: req.body.offer === 'true',
            beds: req.body.beds ? parseInt(req.body.beds) : undefined,  // Added check for existence
            baths: req.body.baths ? parseInt(req.body.baths) : undefined, // Added check for existence
            regularPrice: req.body.regularPrice ? parseFloat(req.body.regularPrice) : undefined,  // Added check for existence
            discountedPrice: req.body.discountedPrice ? parseFloat(req.body.discountedPrice) : undefined, // Added check for existence
            userRef: req.body.userRef,
        };

        // Handle uploaded images (store file paths, not buffers)
        if (req.files) {
            parsedBody.images = req.files.map(file => `images/${file.filename}`); // Store the file path relative to the "images" folder
        }

        // Create the listing in the database
        const listing = await Listing.create(parsedBody);

        return res.status(201).json(listing);
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
};

const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found'))
    }
    if (req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete your own listings!'))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted!')
    } catch (error) {
        next(error)
    }
}

const updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }

        // Ensure userRef is not an array
        if (Array.isArray(req.body.userRef)) {
            req.body.userRef = req.body.userRef[0];
        }

        if (req.user.id !== listing.userRef.toString()) {
            return next(errorHandler(401, 'You can only update your own listings!'));
        }

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => `images/${file.filename}`);
            req.body.images = imagePaths;
        } else if (req.body.existingImages) {
            try {
                // Parse the existing image paths sent as JSON string
                const parsedImages = JSON.parse(req.body.existingImages);
                req.body.images = parsedImages.map(img => img.replace(/^http:\/\/localhost:5000\//, '')); // convert full URL to relative path
            } catch (err) {
                return next(errorHandler(400, "Invalid existing image data"));
            }
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedListing);
    } catch (error) {
        console.error("Error updating listing:", error);
        next(error);
    }
};

const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 6;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const offer = req.query.offer === 'true' ? true
            : req.query.offer === 'false' ? false
                : { $in: [true, false] };

        const furnished = req.query.furnished === 'true' ? true
            : req.query.furnished === 'false' ? false
                : { $in: [true, false] };

        const parking = req.query.parking === 'true' ? true
            : req.query.parking === 'false' ? false
                : { $in: [true, false] };

        const type = req.query.type && req.query.type !== 'all'
            ? req.query.type
            : { $in: ['sell', 'rent'] };

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        console.log({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type
        });


        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,

        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};



module.exports = { createListing, deleteListing, updateListing, getListing, getListings };
