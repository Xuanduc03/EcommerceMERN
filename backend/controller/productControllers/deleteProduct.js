const productModel = require("../../models/productModel");

async function DeleteProductController(req, res) {
    try {
        const { productId } = req.body;

        const payLoad = {
            ...(productId && { productId }),
        };

    
        const user = await productModel.findById(productId); // Tìm người dùng theo userId

        if (!user) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại.",
                error: true,
                success: false
            });
        }

        const deleteUser = await productModel.findByIdAndDelete(productId, payLoad, {new : true});

        if(!deleteUser) {
            return res.status(400).json({
                message: "Can't delete user",
                error: true,
                success : false
            })
        }

        return res.status(200).json({
            message : "User deleted successful",
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

module.exports = DeleteProductController