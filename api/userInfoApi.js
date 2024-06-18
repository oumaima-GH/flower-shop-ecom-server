const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');
const { getAllUserInfo, getUserInfoById, postUserInfo, putUserInfo, deleteUserInfo } = require('../services/userInfoService');

const getAllInfo = async (req, res, next) => {
    try {
        const users = await getAllUserInfo();
        handleSuccess(res, users);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const getInfoById = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return next(new ErrorHandler(400, 'Invalid user ID'));
        }
        const user = await getUserInfoById(userId);
        if (!user) {
            return next(new ErrorHandler(404, 'User not found'));
        }
        handleSuccess(res, user);
    } catch (err) {
        console.log('Error details:', err.message);
        next(new ErrorHandler(500, err.message));
    }
};

const createUserInfo = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        let { firstName, lastName, phone } = req.body;

        if (!phone || phone.length !== 10) {
            return next(new ErrorHandler(400, 'Phone number must be 10 digits'));
        }

        firstName = firstName || null;
        lastName = lastName || null;

        const user = await postUserInfo(userId, firstName, lastName, phone);
        handleSuccess(res, user, 201, 'User information created');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};


const updateUserInfo = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const { firstName, lastName, phone } = req.body;

        const user = await putUserInfo(userId, firstName, lastName, phone);
        handleSuccess(res, user, 200, 'User information updated');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const deleteInfoUser = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await deleteUserInfo(userId);
        handleSuccess(res, user, 200, 'User information deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

module.exports = { getAllInfo, getInfoById, createUserInfo, updateUserInfo, deleteInfoUser };
