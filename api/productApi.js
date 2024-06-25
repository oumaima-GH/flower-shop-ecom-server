const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');

const {getAllProducts, getProductById, postProduct, putProduct, deleteProduct} = require('../services/productService');

const getProducts = async (req, res, next) => {
    try {
        const products = await getAllProducts();

        if (!products) {
            throw new ErrorHandler(404, 'No products found');
        }

        handleSuccess(res, products);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        if (!product) {
            throw new ErrorHandler(404, 'Product not found');
        }

        handleSuccess(res, product);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, image, stock, categoryId  } = req.body;
        const userId = +req.user.id;
        // console.log("Request body in createProduct:", req.body)

        if (!name || !description || !price || !image || !stock || !categoryId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newProduct = await postProduct({ name, description, price, image, stock, userId, categoryId });

        handleSuccess(res, newProduct, 201, 'Product created');
        
    } catch (err) {
        // console.error("Error in createProduct:", err.message); 
        next(new ErrorHandler(500, err.message));
    }
};


const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, stock, categoryId } = req.body;
        const userId = req.user.id;
        // console.log("Request params in updateProduct:", req.params); 
        // console.log("Request body in updateProduct:", req.body); 

        // if (!name || !description || !price || !image || !stock) {
        //     return res.status(400).json({ message: 'Please provide all required fields' });
        // }

        const updatedProduct = await putProduct(id, name, description, price, image, stock, categoryId, userId);

        handleSuccess(res, updatedProduct, 200, 'Product updated');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const removeProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await deleteProduct(id);

        handleSuccess(res, product, 200, 'Product deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
};