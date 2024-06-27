const db = require('../prismaDb');
const { ErrorHandler } = require('../utils/handleError');

const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany({
            include: { product: true }
        });
        return categories;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

const getCategoryById = async (id) => {
    try {
        const category = await db.category.findUnique({
            where: { id: parseInt(id) },
            include: { product: true }
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
        const existingCategory = await db.category.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingCategory) {
            throw new ErrorHandler(404, 'Category not found');
        }

        const category = await db.category.update({
            where: { id: parseInt(id) },
            data: { name }
        });

        // update associated products
        await db.product.updateMany({
            where: { categoryId: parseInt(id) },
            data: {
                categoryId: category.id
            } 
        });

        return category;
    } catch (err) {
        console.log(err.message);
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

        // delete associated products
        await db.product.deleteMany({
            where: { categoryId: parseInt(id) }
        });

        // delete the category
        const deletedCategory = await db.category.delete({
            where: { id: parseInt(id) }
        });

        return deletedCategory;
    } catch (err) {
        throw new ErrorHandler(500, err.message);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory
};
