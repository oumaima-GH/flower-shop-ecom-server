const {ErrorHandler} = require('../utils/handleError');
const {handleSuccess} = require('../utils/handleSuccess');


const {getAllReviews, getReviewById, postReview, putReview, deleteReview} = require('../services/reviewService');

const getReviews = async (req, res, next) => {
    try {
        const reviews = await getAllReviews();

        if (!reviews) {
            throw new ErrorHandler(404, 'No reviews found');
        }

        handleSuccess(res, reviews);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);

        if (!review) {
            throw new ErrorHandler(404, 'Review not found');
        }

        handleSuccess(res, review);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const createReview = async (req, res, next) => {
    try {
        const { comment, rating, productId } = req.body;
        const userId = req.user.id;

        if (!comment || !rating || !productId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newReview = await postReview({ comment, rating, userId, productId });

        handleSuccess(res, newReview, 201, 'Review created');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const updateReview = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const reviewId = +req.params.id;

        // if (!reviewId || !comment || !rating || !productId) {
        //     return next(new ErrorHandler(400, 'Please provide all required fields'));
        // }

        const updatedReview = await putReview(reviewId, comment, rating);

        handleSuccess(res, updatedReview, 200, 'Review updated');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};


const removeReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedReview = await deleteReview(id);

        handleSuccess(res, deletedReview, 200, 'Review deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}


module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    removeReview
}