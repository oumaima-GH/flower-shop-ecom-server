const jwt = require('jsonwebtoken');
const { ErrorHandler, handleError } = require('../utils/handleError');
const {promisify} = require('util');
const { user } = require('../prismaDb');


const isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        throw new ErrorHandler(401, 'Unauthorized');
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
        throw new ErrorHandler(401, 'Unauthorized');
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp

        };
        next()
        }catch(err){handleError(res, err)}
    
}


const isAuthorized = (...role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            throw new ErrorHandler(401, 'You are not authenticated');
        }

        if(!role.includes(req.user.role)){
            throw new ErrorHandler(401, 'Unauthorized');
        }
        next();
    }
}

module.exports = { isAuthenticated, isAuthorized };