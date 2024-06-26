// const { ErrorHandler, handleError } = require('../utils/handleError');
// const { handleSuccess } = require('../utils/handleSuccess');

// const { getCarts, postCart } = require('../services/cartService');
// const { getProductById, putProduct } = require('../services/productService');

// const getCarts = async (req, res, next) => {
//     try {
//         const { userId, cartId } = req.params;
//         const carts = await getCarts(userId, cartId);

//         if (!carts) {
//             throw new ErrorHandler(404, 'Cart is empty');
//         }

//         handleSuccess(res, carts);
//     } catch (err) {
//         next(new ErrorHandler(500, err.message));
//     }
// }

// const createCart = async (req, res, next) => {
//     try {
//         const { productId, quantity } = req.body;
//         const userId = req.user.id; 

//         if (!productId || !quantity) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }

//         if (quantity <= 0) {
//             return next(new ErrorHandler(400, "Quantity must be greater than 0"));
//         }

//         const product = await getProductById(productId);

//         if (!product) {
//             return next(new ErrorHandler(404, "Product not found"));
//         }

//         if (product.stock < quantity) {
//             return next(new ErrorHandler(400, `Insufficient stock, available: ${product.stock}`));
//         }

//         const newCart = await postCart({ userId, productId, quantity });
//         const newStock = product.stock - quantity;
//         await putProduct(productId, { stock: newStock });

//         handleSuccess(res, newCart, 201, 'Cart created');
//     } catch (err) {
//         next(new ErrorHandler(500, err.message));
//     }
// };

// module.exports = { createCart };


// module.exports = { getCarts, createCart };