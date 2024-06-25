const db = require('../prismaDb')
const { ErrorHandler } = require('../utils/handleError');

const getAllProducts = async () => {
    try {
        const products = await db.product.findMany();
        return products;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const getProductById = async (id) => {
    try {
        const product = await db.product.findUnique({
            where: { id: parseInt(id) }
            
        });
        return product;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postProduct = async ({ name, description, price, image, stock, userId, categoryId }) => {
    try {
        // console.log("Inside postProduct - data:", { name, description, price, image, stock, userId, categoryId });
        
        const product = await db.product.create({
            data: { name, description, price, image, stock, userId, categoryId }
            ,
            include : {
                category : true,
                user : true
            }
        });
        
        return product;
    } catch (err) {
        console.error("Error in postProduct:", err); 
        throw new ErrorHandler(500, 'Failed to create product');
    }
}

const putProduct = async (id, name, description, price, image, stock, categoryId) => {
    try {
        const existingProduct = await db.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProduct) {
            throw new ErrorHandler(404, 'Product not found');
        }

        const product = await db.product.update({
            where: { id: parseInt(id) },
            data: { name, description, price, image, stock, categoryId },
            include : {
                category : true,
                user : true
            }
        });

        return product;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const deleteProduct = async (id) => {
    try {
        const existingProduct = await db.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProduct) {
            throw new ErrorHandler(404, 'Product not found');
        }

        await db.product.delete({
            where: { id: parseInt(id) }
        });

        return existingProduct;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

module.exports = { getAllProducts, getProductById, postProduct, putProduct, deleteProduct };