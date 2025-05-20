const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header 
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // attach user ID to the request object, so can use it in controllers
            req.user = { userId: decoded.userId };

            next(); // move to the next middleware or route handler

        } catch (error) {
            console.error('auth middleware error:', error);
            return res.status(401).json({ message: 'not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'not authorized, no token' });
    }
};

module.exports = authMiddleware;