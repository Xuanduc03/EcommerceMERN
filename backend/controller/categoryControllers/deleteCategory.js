const { model } = require("mongoose");
const Category = require("../../models/categoryModel");

async function DeleteCategoryController(req, res) {
    try {
        const { categoryId } = req.body;

        const payLoad = {
            ...(categoryId && {categoryId})
        }

        const category = await Category.findById(categoryId);

        if(!category) {
            return res.status(401).json({
                message : "Cann't delete the category",
                success : false,
                error: true
            })
        }

        const deleteCategory = await Category.findByIdAndDelete(categoryId, payLoad, {new : true});

        if(!deleteCategory) {
            return res.status(400).json({
                message: "Can't delete category",
                error: true,
                success : false
            })
        }

        return res.status(200).json({
            message : "Category deleted successful",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Có lỗi xảy ra.",
            error: true,
            success: false
        });
    }
}

module.exports = DeleteCategoryController;