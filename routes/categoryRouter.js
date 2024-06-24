const router = require('express').Router();

const {     getCategories,
    getCategory,
    createCategory,
    updateCategory,
    removeCategory } = require('../api/categoryApi');

router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', removeCategory);

module.exports = router;