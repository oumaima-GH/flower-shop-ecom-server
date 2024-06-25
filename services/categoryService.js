const db = require('../prismaDb')
const { ErrorHandler } = require('../utils/handleError');


const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany();
        return categories;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}


const getCategoryById = async (id) => {
    try {
        const category = await db.category.findUnique({
            where: { id: parseInt(id) }
        });
        return category;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const postCategory = async ({ name }) => {
    try {
        const category = await db.category.create({
            data: { name }
        });
        return category;
    } catch (err) {
        throw new ErrorHandler(500, 'Failed to create category');
    }
}

const putCategory = async (id, name) => {
    try {
        // console.log("Inside putCategory - ID:", id, "Name:", name); 

        const existingCategory = await db.category.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingCategory) {
            // console.log("Category not found for ID:", id);
            throw new ErrorHandler(404, 'Category not found');
        }

        const category = await db.category.update({
            where: { id: parseInt(id) },
            data: { name }
        });

        return category;
    } catch (err) {
        // console.error("Error in putCategory:", err); 
        throw new ErrorHandler(500, err.message);
    }
}


const deleteCategory = async (id) => {
    try {
        const existingCategory = await db.category.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingCategory) {
            throw new ErrorHandler(404, 'Category not found');
        }

       
        await db.product.deleteMany({
            where: { categoryId: parseInt(id) }
        });

        
        const deletedCategory = await db.category.delete({
            where: { id: parseInt(id) }
        });

        return deletedCategory;
    } catch (err) {
        console.error("Error in deleteCategory:", err.message);
        throw new ErrorHandler(500, err.message);
    }
}



module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory
}