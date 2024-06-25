const router = require('express').Router();
const { 
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    removeAddress 
} = require('../api/addressApi');

const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/address', isAuthenticated, getAddresses);
router.get('/address/:id', isAuthenticated, getAddress);
router.post('/address', isAuthenticated, createAddress);
router.put('/address/:id', isAuthenticated, updateAddress);
router.delete('/address/:id', isAuthenticated, removeAddress);

module.exports = router;