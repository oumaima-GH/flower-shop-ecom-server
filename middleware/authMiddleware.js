const jwt = require('jsonwebtoken');
const { ErrorHandler, handleError } = require('../utils/handleError');
const {promisify} = require('util');


const isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    // console.log('Authorization Header:', bearerHeader);

    if (!bearerHeader) {
        return next(new ErrorHandler(401, 'Authorization header is missing'));
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
        return next(new ErrorHandler(401, 'Token is missing'));
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        // console.log('Decoded:', decoded);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp
        };
        next();
    } catch (err) {
        return next(new ErrorHandler(401, 'Unauthorized: Invalid token'));
    }
}


const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler(401, 'Unauthorized: No user data'));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(403, 'Forbidden: You are not authorized to access this resource'));
        }

        next();
    };
};

module.exports = { isAuthenticated, isAuthorized };