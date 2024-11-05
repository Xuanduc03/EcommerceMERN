const ProductModel = require("../../models/productModel");

async function AllProductController(req, res) {
    try {
        const allProduct = await ProductModel.find();

        res.status(200).json({
            message: "all product is here",
            data: allProduct,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = AllProductController;