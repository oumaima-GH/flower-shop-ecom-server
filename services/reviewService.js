const { login } = require('../api/auth/authApi');
const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const getAllReviews = async () => {
    try {
        const reviews = await db.review.findMany();
        return reviews;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const getReviewById = async (id) => {
    try {
        const review = await db.review.findUnique({
            where: { id: parseInt(id) }
        });
        return review;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postReview = async ({ comment, rating, userId, productId }) => {
    try {
        if (!userId || !productId) {
            throw new ErrorHandler(400, 'userId and productId are required');
        }

        const review = await db.review.create({
            data: { comment, rating, userId, productId },
            include: {
                user: true,
                product: true
            }
        });
        return review;
    } catch (err) {
        console.error(err);
        throw new ErrorHandler(500, 'Failed to create review');
    }
}


const putReview = async (id, comment, rating) => {
    try {
        const updatedReview = await db.review.update({
          where: {
            id: id,
          },
          data: {
            rating,
            comment,
          },
        });
    
        return updatedReview;
      } catch (error) {
        throw new ErrorHandler(500, error.message);
      }
    // try {
    //     // Check if the review exists
    //     const existingReview = await db.review.findUnique({
    //         where: { id: parseInt(id) }
    //     });

    //     if (!existingReview) {
    //         throw new ErrorHandler(404, 'Review not found');
    //     }

    //     // Check if the product exists
    //     const existingProduct = await db.product.findUnique({
    //         where: { id: parseInt(productId) }
    //     });

    //     if (!existingProduct) {
    //         throw new ErrorHandler(404, 'Product not found');
    //     }

    //     // Update the review
    //     const review = await db.review.update({
    //         where: { id: parseInt(id) },
    //         data: { comment, rating, productId: parseInt(productId) },
    //         include: {
    //             user: true,
    //             product: true
    //         }
    //     });

    //     return review;
    // } catch (err) {
    //     console.log(err.message);
    //     throw new ErrorHandler(500, err.message);
    // }
}


const deleteReview = async (id) => {
    try {
        
        const review = await db.review.delete({
            where: { id: parseInt(id) }
        });
        return review;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}


module.exports = {
    getAllReviews,
    getReviewById,
    postReview,
    putReview,
    deleteReview
}