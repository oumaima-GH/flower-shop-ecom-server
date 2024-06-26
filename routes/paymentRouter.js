const router = require('express').Router();
const { 
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    removePayment 
} = require('../api/paymentApi');
const { isAuthenticated, isAuthorized } = require('../middleware/authMiddleware');

router.get('/payments', isAuthenticated, isAuthorized('Seller'), getPayments);
router.get('/payments/:id', isAuthenticated, isAuthorized('Seller'), getPayment);
router.post('/payments', isAuthenticated, isAuthorized('Seller', 'Customer'),createPayment);
router.put('/payments/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), updatePayment);
router.delete('/payments/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), removePayment);

module.exports = router;