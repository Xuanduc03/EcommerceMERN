const ProductModel = require("../../models/productModel");

async function AddProductController(req, res) {
    try {
        const { name, description, summary, price, category, stock, imageUrl, manufacturarName, productId, shipping } = req.body;

        // Kiểm tra giá
        if (price <= 0) {
            return res.status(400).json({
                message: "Invalid input: Price must be a positive number.",
                success: false,
                error: true
            });
        }

        // Tạo payload mới
        const payLoad = {
            name,
            description,
            summary,
            price,
            category,
            stock,
            imageUrl,
            manufacturarName,
            productId,
            shipping
        };

        const newProduct = new ProductModel(payLoad);
        const savedProduct = await newProduct.save();
        console.log(savedProduct);

        res.status(201).json({
            data: savedProduct,
            message: "Add product is successful",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error: true
        });
    }
}

module.exports = AddProductController;