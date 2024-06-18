const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const getAllUsers = async () => {
    try {
        const users = await db.user.findMany();
        return users;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

const getUserById = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: { id: parseInt(id) }
        });
        return user;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

const postUser = async ({ username, email, password }) => {
    try {
        const user = await db.user.create({
            data: { username, email, password }
        });
        return user;
    } catch (err) {
        throw new ErrorHandler(500, 'Failed to create user');
    }
};

const findUserByEmail = async (email) => {
    try {
        const isEmail = await db.user.findUnique({
            where: { email }
        });
        return isEmail;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const existingUser = await db.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = await db.user.update({
            where: { id: parseInt(id) },
            data: { username, email }
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user' });
    }
};

const deleteUser = async (id) => {
    try {
        const existingUser = await db.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        await db.user.delete({ where: { id: parseInt(id) } });
        return { message: 'User deleted successfully' };
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

module.exports = { getAllUsers, getUserById, postUser, findUserByEmail, putUser, deleteUser };
