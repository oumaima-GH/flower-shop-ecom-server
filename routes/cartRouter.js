const router = require('express').Router();
const { getCarts, addProduct, deleteProduct, updateProduct, clear } = require('../api/cartApi');  

const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/carts', isAuthenticated, getCarts);
router.post('/carts', isAuthenticated, addProduct);
router.delete('/carts', isAuthenticated, deleteProduct);
router.put('/carts', isAuthenticated, updateProduct);
router.delete('/carts/clear', isAuthenticated, clear);


module.exports = router;
