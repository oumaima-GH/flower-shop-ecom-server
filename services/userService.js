const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({
            include: {
                userInfo: true,
                address: true,
                review: true,
                order: true,
                cart: true,
                payment: true,
            },
        });
        return users;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

const getUserById = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: { id: parseInt(id) },
            include: {
                userInfo: true,
                address: true,
                review: true,
                order: true,
                cart: true,
                payment: true,
            },
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
        const { username, email, password, userInfo, address, review, order, cart, payment } = req.body;

        const existingUser = await db.user.findUnique({
            where: { id: parseInt(id) },
            include: {
                userInfo: true,
                address: true,
                review: true,
                order: true,
                cart: true,
                payment: true,
            }
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        if (userInfo) {
            const userInfoUpdateData = {};
            if (userInfo.firstName) userInfoUpdateData.firstName = userInfo.firstName;
            if (userInfo.lastName) userInfoUpdateData.lastName = userInfo.lastName;
            if (userInfo.phone) userInfoUpdateData.phone = userInfo.phone;

            if (Object.keys(userInfoUpdateData).length > 0) {
                updateData.userInfo = {
                    update: userInfoUpdateData
                };
            }
        }

        // Update related services
        updateData.address = {
            update: address
        };
        updateData.review = {
            update: review
        };
        updateData.order = {
            update: order
        };
        updateData.cart = {
            update: cart
        };
        updateData.payment = {
            update: payment
        };

        const updatedUser = await db.user.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                userInfo: true,
                address: true,
                review: true,
                order: true,
                cart: true,
                payment: true,
            },
        });

        return updatedUser;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
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

        // Delete related services
        await db.address.deleteMany({
            where: { userId: parseInt(id) }
        });
        await db.review.deleteMany({
            where: { userId: parseInt(id) }
        });
        await db.order.deleteMany({
            where: { userId: parseInt(id) }
        });
        await db.cart.deleteMany({
            where: { userId: parseInt(id) }
        });
        await db.payment.deleteMany({
            where: { userId: parseInt(id) }
        });

        // Finally, delete the user
        await db.user.delete({
            where: { id: parseInt(id) }
        });

        return { message: 'User deleted successfully' };
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

module.exports = { getAllUsers, getUserById, postUser, findUserByEmail, putUser, deleteUser };
