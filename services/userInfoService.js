const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const getAllUserInfo = async () => {
    try {
        const users = await db.userInfo.findMany();
        return users;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

const getUserInfoById = async (id) => {
    try {
        const user = await db.userInfo.findUnique({
            where: { id: parseInt(id) },
            // include: { userInfo: true }
        });
        return user;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

const postUserInfo = async (userId, firstName, lastName, phone) => {
    try {
        const user = await db.userInfo.create({
            data: {
                firstName,
                lastName,
                phone,
                user: {
                    connect: { id: parseInt(userId) }
                }
            }
        });
        return user;
    } catch (err) {
        console.error('Error details:', err);
        throw new ErrorHandler(500, 'Failed to create user');
    }
};

const putUserInfo = async (id, firstName, lastName, phone) => {
    try {
        const existingUser = await db.userInfo.findUnique({
            where: { id: parseInt(id) }
        });

       

        const user = await db.userInfo.update({
            where: { id: parseInt(id) },
            data: { firstName, lastName, phone }
        });

        return existingUser;
    } catch (err) {
        console.log('Error details:', err.message);
        throw new ErrorHandler(500, err.message);
    }
};

const deleteUserInfo = async (id) => {
    try {
        const existingUser = await db.userInfo.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingUser) {
            throw new ErrorHandler(404, 'User not found');
        }

        await db.userInfo.delete({
            where: { id: parseInt(id) }
        });

        return { message: 'User deleted successfully' };
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

module.exports = {
    getAllUserInfo,
    getUserInfoById,
    postUserInfo,
    putUserInfo,
    deleteUserInfo
};
