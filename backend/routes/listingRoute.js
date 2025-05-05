const express = require("express");
const { createListing, deleteListing, updateListing } = require('../controllers/listing.js');
const { verifyToken } = require("../utils/verifyUser.js");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images"); // Folder where images will be saved
    },
    filename: function (req, file, cb) {
        // Naming the file with a unique identifier + original extension
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    },
});

// File filter to allow only specific types of images
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed!'), false);
    }
};

// Multer setup with storage and file filter configuration
let upload = multer({ storage, fileFilter });

// POST route for creating a listing with images
router.post('/create', verifyToken, upload.array('images', 10), async (req, res, next) => {
    try {
        // If files are uploaded, attach the file paths to the req.body.images
        if (req.files) {
            const imagePaths = req.files.map(file => `images/${file.filename}`);
            req.body.images = imagePaths;
        }

        // Call the createListing function to handle saving the listing to the database
        await createListing(req, res);
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});

// DELETE route for deleting a listing
router.delete('/delete/:id', verifyToken, deleteListing);

// POST route for editing a listing
router.post('/update/:id', verifyToken, updateListing);

module.exports = router;
