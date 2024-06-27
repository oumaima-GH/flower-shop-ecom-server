const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const getAllOrders = async () => {
    try {
        const orders = await db.order.findMany({
            include: {
                user: true,
                OrderItem: true,
                Payment: true,
            },
        });
        return orders;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const getOrderById = async (id) => {
    try {
        const order = await db.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: true,
                OrderItem: true,
                Payment: true,
            },
        });
        return order;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postOrder = async ({ userId, orderDate, shippingDate, total }) => {
    try {
        const order = await db.order.create({
            data: {
                userId,
                orderDate,
                shippingDate,
                total,
            },
            include: {
                user: true,
                OrderItem: true,
                Payment: true,
            },
        });
        return order;
    } catch (err) {
        throw new ErrorHandler(500, 'Failed to create order');
    }
}

const putOrder = async (id, userId, orderDate, shippingDate, total) => {
    try {
        const existingOrder = await db.order.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingOrder) {
            throw new ErrorHandler(404, 'Order not found');
        }

        const order = await db.order.update({
            where: { id: parseInt(id) },
            data: { userId, orderDate, shippingDate, total },
            include: {
                user: true,
                OrderItem: true,
                Payment: true,
            },
        });

        return order;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const deleteOrder = async (id) => {
    try {
        const order = await db.order.delete({
            where: { id: parseInt(id) },
            include: {
                OrderItem: true,
                Payment: true,
            },
        });
        return order;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    postOrder,
    putOrder,
    deleteOrder
}
