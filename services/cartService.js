const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const fetchCarts = async (userId, cartId) => {
    try {
        const carts = await db.cart.findMany({
            where: {
                userId,
                id: cartId,
            },
            include: {
                product: true,
            },
        });

        return carts;
    } catch (error) {
        // console.log("Error in fetchCarts:", error.message);
        throw new ErrorHandler(500, error.message);
    }
};



const addProductToCart = async (userId, productId, quantity) => {
    try {
        const cart = await db.cart.findFirst({
            where: {
                userId,
                productId,
            },
        });

        if (cart) {
            await db.cart.update({
                where: {
                    id: cart.id,
                },
                data: {
                    quantity: cart.quantity + quantity,
                },
            });
        } else {
            await db.cart.create({
                data: {
                    userId,
                    productId,
                    quantity,
                },
            });
        }
    } catch (error) {
        // console.log("Error in addProductToCart:", error.message);
        throw new ErrorHandler(500, error.message);
    }
}

const deleteProductFromCart = async (userId, productId) => {
    try {
        await db.cart.deleteMany({
            where: {
                userId,
                productId,
            },
        });
    } catch (error) {
        // console.log("Error in deleteProductFromCart:", error.message);
        throw new ErrorHandler(500, error.message);
    }
}

const updateProductInCart = async (userId, productId, quantity) => {
    try {
        await db.cart.updateMany({
            where: {
                userId,
                productId,
            },
            data: {
                quantity,
            },
        });
    } catch (error) {
        // console.log("Error in updateProductInCart:", error.message);
        throw new ErrorHandler(500, error.message);
    }
}

const clearCart = async (userId) => {
    try {
        await db.cart.deleteMany({
            where: {
                userId,
            },
        });
    } catch (error) {
        // console.log("Error in clearCart:", error.message);
        throw new ErrorHandler(500, error.message);
    }
}

module.exports = { fetchCarts, addProductToCart, deleteProductFromCart, updateProductInCart, clearCart };
