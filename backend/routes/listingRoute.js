const express = require("express");
const {createListing} = require('../controllers/listing.js');
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.post('/create', verifyToken, createListing)

module.exports = router