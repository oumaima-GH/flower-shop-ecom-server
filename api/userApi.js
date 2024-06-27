const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');
const { getAllUsers, getUserById, postUser, putUser, deleteUser } = require('../services/userService');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            throw new ErrorHandler(404, 'No users found');
        }

        handleSuccess(res, users);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            throw new ErrorHandler(404, 'User not found');
        }

        handleSuccess(res, user);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await postUser({ username, email, password: hashedPassword });

        handleSuccess(res, newUser, 201, 'User created');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await putUser(req, res);
        handleSuccess(res, user);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await deleteUser(id);

        handleSuccess(res, user);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, removeUser };
