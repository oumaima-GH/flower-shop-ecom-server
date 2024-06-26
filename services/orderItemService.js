const db = require('../prismaDb')
const { ErrorHandler } = require('../utils/handleError');

const getAllOrderItems = async () => {
    try {
        const orderItems = await db.orderItem.findMany({
            include: {
                order: true,
                product: true
            }
        });
        return orderItems;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const getOrderItemById = async (id) => {
    try {
        const orderItem = await db.orderItem.findUnique({
            where: { id: parseInt(id) },
            include: {
                order: true,
                product: true
            }
        });
        return orderItem;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postOrderItem = async ({ orderId, productId, quantity, price, subtotal }) => {
    try {
        const orderItem = await db.orderItem.create({
            data: { orderId, productId, quantity, price, subtotal},
            include: {
                order: true,
                product: true
            }
        });
        return orderItem;
    } catch (err) {
        console.log("Error in postOrderItem:", err.message);
        throw new ErrorHandler(500, 'Failed to create order item');
    }
}

const putOrderItem = async (id, orderId, productId, quantity, price, subtotal) => {
    try {
        const existingOrderItem = await db.orderItem.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingOrderItem) {
            throw new ErrorHandler(404, 'Order item not found');
        }

        const orderItem = await db.orderItem.update({
            where: { id: parseInt(id) },
            data: { orderId, productId, quantity, price, subtotal },
            include: {
                order: true,
                product: true
            }
        });

        return orderItem;
    } catch (err) {
        throw new ErrorHandler(500, 'Failed to update order item');
    }
}

const deleteOrderItem = async (id) => {
    try {
        const existingOrderItem = await db.orderItem.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingOrderItem) {
            throw new ErrorHandler(404, 'Order item not found');
        }

        await db.orderItem.delete({
            where: { id: parseInt(id) }
        });

        return existingOrderItem;
    } catch (err) {
        throw new ErrorHandler(500, 'Failed to delete order item');
    }
}

module.exports = {
    getAllOrderItems,
    getOrderItemById,
    postOrderItem,
    putOrderItem,
    deleteOrderItem
}