const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');
const { getAllProducts, getProductById, postProduct, putProduct, deleteProduct } = require('../services/productService');

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
};

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
};

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, '/') : null;
        const baseURL = "http://127.0.0.1:3000/uploads/";
        const fileName = image.split('\\').pop().split('/').pop();
        const newImage = baseURL + fileName;

        const userId = +req.user.id;
        console.log("==========================>",newImage)
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        if (!name || !description || !price || !stock || !categoryId || !newImage) {
            console.error('Missing required fields:', { name, description, price, stock, categoryId, newImage });
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stock, 10);
        const parsedCategoryId = parseInt(categoryId, 10);

        const newProduct = await postProduct({ 
            name, 
            description, 
            price: parsedPrice, 
            image : newImage, 
            stock: parsedStock, 
            userId, 
            categoryId: parsedCategoryId 
        });

        handleSuccess(res, newProduct, 201, 'Product created');
    } catch (err) {
        console.error('Error in createProduct:', err.message);
        next(new ErrorHandler(500, err.message));
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, stock, categoryId } = req.body;
        const userId = req.user.id;

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

const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            throw new ErrorHandler(400, "Please provide an image");
        }

        const imageUrl = `api/uploads/${req.file.filename}`;

        handleSuccess(res, imageUrl, 200, "Image uploaded successfully");
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
    uploadImage
};
