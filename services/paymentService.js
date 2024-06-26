const db = require('../prismaDb')
const { ErrorHandler } = require('../utils/handleError');

const getAllPayments = async () => {
    try {
        const payments = await db.payment.findMany({
            include: {
                user: true,
                order: true
            }
        });
        return payments;
    }catch(err){
        throw new ErrorHandler(500, err.message);
    }

}

const getPaymentById = async (id) => {
    try {
        const payment = await db.payment.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: true,
                order: true
            }
        });
        return payment;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postPayment = async ({ amount, paymentMethod, paymentDate, userId, orderId }) => {
    try {
        const payment = await db.payment.create({
            data: { amount, paymentMethod, paymentDate, userId, orderId },
            include: {
                user: true,
                order: true
            }
        });
        return payment;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const putPayment = async (id, amount, paymentMethod, paymentDate, userId, orderId) => {
    try {
        const existingPayment = await db.payment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingPayment) {
            throw new ErrorHandler(404, 'Payment not found');
        }

        const payment = await db.payment.update({
            where: { id: parseInt(id) },
            data: { amount, paymentMethod, paymentDate, userId, orderId },
            include: {
                user: true,
                order: true
            }
        });

        return payment;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const deletePayment = async (id) => {
    try {
        const existingPayment = await db.payment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingPayment) {
            throw new ErrorHandler(404, 'Payment not found');
        }

        await db.payment.delete({
            where: { id: parseInt(id) }
        });

        return existingPayment;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    postPayment,
    putPayment,
    deletePayment
}