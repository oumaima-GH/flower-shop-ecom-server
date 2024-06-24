const { ErrorHandler, handleError } = require('../utils/handleError');
const { handleSuccess } = require('../utils/handleSuccess');
const { getAllCategories, getCategoryById, postCategory, putCategory, deleteCategory } = require('../services/categoryService');


const getCategories = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        if (!categories) {
            throw new ErrorHandler(404, 'No categories found');
        }

        handleSuccess(res, categories);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}

const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);

        if (!category) {
            throw new ErrorHandler(404, 'Category not found');
        }

        handleSuccess(res, category);
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}


const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        
        
        if (!name) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newCategory = await postCategory({ name });

        handleSuccess(res, newCategory, 201, 'Category created');
        
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        // console.log("Request params in updateCategory:", req.params); 
        // console.log("Request body in updateCategory:", req.body); 

        const category = await putCategory(id, name);

        handleSuccess(res, category, 200, 'Category updated');
    } catch (err) {
        // console.error("Error in updateCategory:", err); 
        next(new ErrorHandler(500, err.message));
    }
}

const removeCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await deleteCategory(id);

        handleSuccess(res, category, 200, 'Category deleted');
    } catch (err) {
        next(new ErrorHandler(500, err.message));
    }
}


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    removeCategory
}