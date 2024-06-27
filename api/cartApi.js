const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');

const { fetchCarts, addProductToCart, deleteProductFromCart, updateProductInCart, clearCart } = require('../services/cartService');

const getCarts = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const userId = req.user.id;

        const carts = await fetchCarts(userId, cartId);

        if (!carts || carts.length === 0) {
            throw new ErrorHandler(404, 'Cart is empty');
        }

        handleSuccess(res, carts, 200, 'Carts retrieved');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};


const addProduct = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Please provide productId and quantity' });
        }

        await addProductToCart(userId, productId, quantity);

        handleSuccess(res, 201, 'Product added to cart');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ message: 'Please provide productId' });
        }

        await deleteProductFromCart(userId, productId);

        handleSuccess(res, 200, 'Product deleted from cart');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'Specify product and quantity' });
        }

        await updateProductInCart(userId, productId, quantity);

        handleSuccess(res, 200, 'Product updated in cart');
    } catch (err) {
        console.log("Error in updateProduct:", err.message);
        next(new ErrorHandler(500, err.message));
    }
}

const clear = async (req, res, next) => {
    try {
        const userId = req.user.id;

        await clearCart(userId);

        handleSuccess(res, 200, 'Cart cleared');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

module.exports = { getCarts, addProduct, deleteProduct, updateProduct, clear };
