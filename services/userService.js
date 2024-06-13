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
            where: {
                id: parseInt(id)
            }
        });

        return user;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postUser = async (req, res) => {
    try {
    const {username, email, password, role} = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

        const user = await db.user.create({
            data: {
                username,
                email,
                password,
                role
            }
        });

        res.status(201).json(user);
    } catch (err) {
        // console.error('Error creating user:', err);
        res.status(500).json({ message: 'Failed to create user' });
    }
}

const putUser = async (req, res) => {


    try {
        
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        
        const existingUser = await db.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = await db.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                username,
                email,
                password,
                role
            }
        });

        res.status(200).json(user);
    } catch (err) {
        // console.error('Error updating user:', err);
        res.status(500).json({ message: 'Failed to update user' });
    }
}

const deleteUser = async (id) => {
        try {
            const existingUser = await db.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
    
            if (!existingUser) {
                throw new Error('User not found');
            }

        await db.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return { message: 'User deleted successfully' };
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
};

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser };
