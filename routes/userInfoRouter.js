const express = require('express');
const router = express.Router();

const { getAllInfo, getInfoById, createUserInfo, updateUserInfo, deleteInfoUser } = require('../api/userInfoApi');
// const {isAuthenticated, isAuthorized} = require('../middleware/authMiddleware');

router.get('/userinfo', getAllInfo);
router.get('/userinfo/:id', getInfoById);
router.post('/userinfo/:id', createUserInfo);
router.put('/userinfo/:id', updateUserInfo);
router.delete('/userInfo/:id', deleteInfoUser);

module.exports = router;
