const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token.' });
        }

        // 1. Check if token is in the blacklist
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Not authorized, token has been blacklisted (logged out).' });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(401).json({ message: 'Not authorized, token failed.' });
    }
};

module.exports = { protect };