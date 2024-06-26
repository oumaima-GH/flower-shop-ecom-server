const router = require('express').Router();
const { 
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    removeOrder 
} = require('../api/orderApi');

const { isAuthenticated, isAuthorized } = require('../middleware/authMiddleware');

router.get('/orders', isAuthenticated, isAuthorized('Seller', 'Customer'), getOrders);
router.get('/orders/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), getOrder);
router.post('/orders', isAuthenticated, isAuthorized('Seller', 'Customer'), createOrder);
router.put('/orders/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), updateOrder);
router.delete('/orders/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), removeOrder);

module.exports = router;
