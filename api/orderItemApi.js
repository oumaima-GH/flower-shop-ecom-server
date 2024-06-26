const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');

const {getAllOrderItems, getOrderItemById, postOrderItem, putOrderItem, deleteOrderItem} = require('../services/orderItemService');

const getOrderItems = async (req, res, next) => {
    try {
        const orderItems = await getAllOrderItems();

        if (!orderItems) {
            throw new ErrorHandler(404, 'No order items found');
        }

        handleSuccess(res, orderItems);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderItem = await getOrderItemById(id);

        if (!orderItem) {
            throw new ErrorHandler(404, 'Order item not found');
        }

        handleSuccess(res, orderItem);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const createOrderItem = async (req, res, next) => {
    try {
        const { orderId, productId, quantity, price, subtotal} = req.body;
        // console.log("Request body in createOrderItem:", req.body)

        if (!orderId || !productId || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newOrderItem = await postOrderItem({ orderId, productId, quantity, price, subtotal});

        handleSuccess(res, newOrderItem, 201, 'Order item created');
        
    } catch (err) {
        // console.error("Error in createOrderItem:", err.message); 
        next(new ErrorHandler(500, err.message));
    }
};

const updateOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderId, productId, quantity, price, subtotal } = req.body;

        const updatedOrderItem = await putOrderItem(id, orderId, productId, quantity, price, subtotal);

        handleSuccess(res, updatedOrderItem, 200, 'Order item updated');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const removeOrderItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderItem = await deleteOrderItem(id);

        if (!orderItem) {
            throw new ErrorHandler(404, 'Order item not found');
        }

        handleSuccess(res, orderItem, 200, 'Order item deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

module.exports = {
    getOrderItems,
    getOrderItem,
    createOrderItem,
    updateOrderItem,
    removeOrderItem
}
