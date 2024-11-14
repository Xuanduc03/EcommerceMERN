const Category = require("../../models/categoryModel");

async function AddCategoryController(req, res) {
    try {
        const { name, description, imageUrl, status, subCategories } = req.body;

        const payLoad = {
            name,
            description,
            imageUrl,
            status,
            subCategories,
        };

        const newCategory = new Category(payLoad);
        const savedCategory = await newCategory.save();

        console.log(savedCategory)
        res.status(201).json({
            data: savedCategory,
            message: "Thêm danh mục thành công",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error: true
        });
    }
}

module.exports = AddCategoryController;