const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');


const {getAllOrders, getOrderById, postOrder, putOrder, deleteOrder} = require('../services/orderService');

const getOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrders();

        if (!orders) {
            throw new ErrorHandler(404, 'No orders found');
        }

        handleSuccess(res, orders);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await getOrderById(id);

        if (!order) {
            throw new ErrorHandler(404, 'Order not found');
        }

        handleSuccess(res, order);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}


const createOrder = async (req, res, next) => {
    try {
        const { orderDate, shippingDate, total } = req.body;
        const userId = +req.user.id;
        // console.log("Request body in createOrder:", req.body)

        if ( !orderDate || !shippingDate || !total) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newOrder = await postOrder({ userId, orderDate, shippingDate, total });

        handleSuccess(res, newOrder, 201, 'Order created');
        
    } catch (err) {
        // console.error("Error in createOrder:", err.message); 
        next(new ErrorHandler(500, err.message));
    }
};


const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderDate, shippingDate, total } = req.body;
        const userId = req.user.id;

        const updatedOrder = await putOrder(id, userId, orderDate, shippingDate, total);

        handleSuccess(res, updatedOrder, 200, 'Order updated');
        
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};


const removeOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedOrder = await deleteOrder(id, userId);

        handleSuccess(res, deletedOrder, 200, 'Order deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    removeOrder
}