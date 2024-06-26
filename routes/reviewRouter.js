const router = require('express').Router();
const { 
    getReviews,
    getReview,
    createReview,
    updateReview,
    removeReview 
} = require('../api/reviewApi');

const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/reviews', isAuthenticated, getReviews);
router.get('/reviews/:id', isAuthenticated, getReview);
router.post('/reviews', isAuthenticated, createReview);
router.put('/reviews/:id', isAuthenticated, updateReview);
router.delete('/reviews/:id', isAuthenticated, removeReview);

module.exports = router;