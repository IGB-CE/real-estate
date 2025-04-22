const express = require("express");
const { signup } = require("../controllers/auth.js");

const router = express.Router();

router.post("/signup", signup)

module.exports = router;