const { ErrorHandler } = require('../../utils/handleError');
const { handleSuccess } = require('../../utils/handleSuccess');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { postUser, findUserByEmail } = require('../../services/userService');




const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(new ErrorHandler(400, 'Please provide all required fields'));
        }
        if (password.length < 6) {
            return next(new ErrorHandler(400, 'Password must be at least 6 characters long'));
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return next(new ErrorHandler(400, 'Email already exists'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await postUser({ username, email, password: hashedPassword });

        handleSuccess(res, newUser, 201, 'User created');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler(400, 'Please provide all required fields'));
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return next(new ErrorHandler(400, 'Invalid credentials'));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ErrorHandler(400, 'Invalid credentials'));
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        handleSuccess(res, {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }, 200, 'Login successful');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

module.exports = { register, login };
