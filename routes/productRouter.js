const router = require('express').Router();
const { 
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    removeProduct,
    uploadImage
} = require('../api/productApi');

const { isAuthenticated, isAuthorized } = require('../middleware/authMiddleware');
const upload = require('../multerConfig');

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', isAuthenticated, isAuthorized('Seller'), upload.single('image'), createProduct);
router.put('/products/:id', isAuthenticated, isAuthorized('Seller'), upload.single('image'), updateProduct);
router.delete('/products/:id', isAuthenticated, isAuthorized('Seller'), removeProduct);
router.post('/uploads', upload.single('image'), uploadImage);

module.exports = router;
