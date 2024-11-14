const Category = require("../../models/categoryModel");

async function ListCategoryController(req, res) {
    try {
        const listCategory = await Category.find();

        res.status(201).json({
            data: listCategory,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: "lỗi không thể tải" || error,
            success: false,
            error: true
        })
    }
}

module.exports = ListCategoryController