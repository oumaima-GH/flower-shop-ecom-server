const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');

const {getAllPayments, getPaymentById, postPayment, putPayment, deletePayment} = require('../services/paymentService');

const getPayments = async (req, res, next) => {
    try {
        const payments = await getAllPayments();

        if (!payments) {
            throw new ErrorHandler(404, 'No payments found');
        }

        handleSuccess(res, payments);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getPayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await getPaymentById(id);

        if (!payment) {
            throw new ErrorHandler(404, 'Payment not found');
        }

        handleSuccess(res, payment);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const createPayment = async (req, res, next) => {
    try {
        const { amount, paymentMethod, paymentDate, orderId } = req.body;
        const userId = +req.user.id;

        if (!amount || !paymentMethod || !paymentDate || !orderId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newPayment = await postPayment({ amount, paymentMethod, paymentDate, userId, orderId });

        handleSuccess(res, newPayment, 201, 'Payment created');
        
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount, paymentMethod, paymentDate, orderId } = req.body;
        const userId = req.user.id;

        const updatedPayment = await putPayment(id, amount, paymentMethod, paymentDate, userId, orderId);

        handleSuccess(res, updatedPayment, 200, 'Payment updated');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const removePayment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPayment = await deletePayment(id);

        handleSuccess(res, deletedPayment, 200, 'Payment deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

module.exports = {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    removePayment
}