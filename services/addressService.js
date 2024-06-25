const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const getAllAddresses = async () => {
    try {
        const addresses = await db.address.findMany();
        return addresses;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const getAddressById = async (id) => {
    try {
        const address = await db.address.findUnique({
            where: { id: parseInt(id) }
        });
        return address;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postAddress = async ({ apartment, street, city, zipCode, userId }) => {
    try {
        const address = await db.address.create({
            data: { apartment, street, city, zipCode, userId },
           include: {
               user: true
           
        }
    }
    );
        return address;
    } catch (err) {
        console.log("Error in postAddress:", err.message);
        throw new ErrorHandler(500, 'Failed to create address');
    }
}


const putAddress = async (id,  apartment, street, city, zipCode, userId ) => {
    try {
        const existingAddress = await db.address.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingAddress) {
            throw new ErrorHandler(404, 'Address not found');
        }

        const address = await db.address.update({
            where: { id: parseInt(id) },
            data: { apartment, street, city, zipCode, userId },
            include: {
                user: true
            }
        });

        return address;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const deleteAddress = async (id) => {
    try {
        const address = await db.address.delete({
            where: { id: parseInt(id) }
        });
        return address;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

module.exports = { getAllAddresses, getAddressById, postAddress, putAddress, deleteAddress };