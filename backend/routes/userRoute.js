const express = require("express");
const { test } = require("../controllers/user");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require("../utils/verifyUser");
const { updateUser, deleteUser } = require('../controllers/user.js')
const path = require("path");


// Konfigurime per multer 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    },
});
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
        cb(null, false);
    }
};
let upload = multer({ storage, fileFilter });

router.get('/test', test);
router.post('/update/:id', verifyToken, upload.single("avatar"), updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router