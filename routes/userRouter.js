const router = require('express').Router();


const {getUsers, getUser, createUser, updateUser, removeUser} = require('../api/userApi');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', removeUser);

module.exports = router;