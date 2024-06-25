const router = require('express').Router();
const { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct 
} = require('../api/productApi');
const { isAuthenticated, isAuthorized } = require('../middleware/authMiddleware');

router.get('/products', isAuthenticated, isAuthorized('Seller', 'Customer'), getProducts);
router.get('/products/:id', isAuthenticated, isAuthorized('Seller', 'Customer'), getProduct);
router.post('/products', isAuthenticated, isAuthorized('Seller'), createProduct);
router.put('/products/:id', isAuthenticated, isAuthorized('Seller'), updateProduct);
router.delete('/products/:id', isAuthenticated, isAuthorized('Seller'), removeProduct);

module.exports = router;
