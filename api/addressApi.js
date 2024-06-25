const {ErrorHandler} = require('../utils/handleError');
const {handleSuccess} = require('../utils/handleSuccess');

const {getAllAddresses, getAddressById, postAddress, putAddress, deleteAddress} = require('../services/addressService');
// const { user } = require('../prismaDb');

const getAddresses = async (req, res, next) => {
    try {
        const addresses = await getAllAddresses();

        if (!addresses) {
            throw new ErrorHandler(404, 'No addresses found');
        }

        handleSuccess(res, addresses);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const address = await getAddressById(id);

        if (!address) {
            throw new ErrorHandler(404, 'Address not found');
        }

        handleSuccess(res, address);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const createAddress = async (req, res, next) => {
    try {
        let { apartment, street, city, zipCode } = req.body;
        const userId = req.user.id;

        if (!apartment && !street && !city && !zipCode) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        street = street ? street : null;
        apartment = apartment ? apartment : null;
        city = city ? city : null;
        zipCode = zipCode ? zipCode : null;

        const newAddress = await postAddress({ apartment, street, city, zipCode, userId});

        handleSuccess(res, newAddress, 201, 'Address created');
        
    } catch (err) {
        // console.error("Error in createAddress:", err); 
        next(new ErrorHandler(500, err.message));
    }
};

const updateAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { apartment, street, city, zipCode } = req.body;
        const userId = req.user.id;

        // if (!apartment && !street && !city && !zipCode) {
        //     return res.status(400).json({ message: 'Please provide all required fields' });
        // }

        const updatedAddress = await putAddress(id, apartment, street, city, zipCode, userId);

        handleSuccess(res, updatedAddress, 200, 'Address updated');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const removeAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const address = await deleteAddress(id);

        handleSuccess(res, address, 200, 'Address deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

module.exports = {
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    removeAddress
}