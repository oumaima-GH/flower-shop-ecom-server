const router = require('express').Router();

const {     getCategories,
    getCategory,
    createCategory,
    updateCategory,
    removeCategory } = require('../api/categoryApi');

const { isAuthenticated, isAuthorized } = require('../middleware/authMiddleware');
 

router.get('/categories', isAuthenticated, isAuthorized('Customer', 'Seller'), getCategories);
router.get('/categories/:id', isAuthenticated, isAuthorized('Customer', 'Seller'), getCategory);
router.post('/categories', isAuthenticated, isAuthorized('Seller'), createCategory);
router.put('/categories/:id', isAuthenticated, isAuthorized('Seller'), updateCategory);
router.delete('/categories/:id', isAuthenticated, isAuthorized('Seller'), removeCategory);

module.exports = router;