const express = require("express");
const { signup, signin, google, logout } = require("../controllers/auth.js");

const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.post('/google', google)
router.post('/logout', logout)

module.exports = router;