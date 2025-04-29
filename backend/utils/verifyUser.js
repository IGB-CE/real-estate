const errorHandler = require("./error");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return next(errorHandler(403, 'Forbidden'));
    }
};

module.exports = { verifyToken };
