const router = require('express').Router();
const { 
    getOrderItems,
    getOrderItem,
    createOrderItem,
    updateOrderItem,
    removeOrderItem 
} = require('../api/orderItemApi');

const { isAuthenticated, isAuthorized } = require('../middleware/authMiddleware');

router.get('/orderItems', isAuthenticated, isAuthorized('Seller', 'Customer'), getOrderItems);
router.get('/orderItems/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), getOrderItem);
router.post('/orderItems', isAuthenticated, isAuthorized('Seller', 'Customer'), createOrderItem);
router.put('/orderItems/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), updateOrderItem);
router.delete('/orderItems/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), removeOrderItem);

module.exports = router;