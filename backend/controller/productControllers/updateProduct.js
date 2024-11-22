const ProductModel = require("../../models/productModel");
const mongoose = require("mongoose");

async function UpdateProductController(req, res) {
    try {
        console.log("Product: ", req.body);
        const { 
            productId, 
            name, 
            description, 
            summary, 
            oldPrice, 
            price, 
            salePercent, 
            category, 
            stock, 
            installment, 
            imageUrl, 
            manufacturarName, 
            productsId, 
            shipping, 
            specifications 
        } = req.body;
        
        const { 
            updatedProcessor, 
            updatedMemory, 
            updatedDisplay, 
            updatedCamera, 
            updatedColor 
        } = specifications || {};
        
        console.log("Check updatedProcessor", updatedProcessor)
        // Kiểm tra productId có tồn tại
        if (!productId) {
            return res.status(400).json({
                message: "ProductId is required",
                success: false,
                error: true,
            });
        }

        // Kiểm tra productId có hợp lệ
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "ProductId is not valid",
                success: false,
                error: true,
            });
        }

        // Làm sạch payload
        const cleanPayload = (obj) => {
            return Object.entries(obj).reduce((acc, [key, value]) => {
                if (value !== undefined) acc[key] = value;
                return acc;
            }, {});
        };

        const payLoad = cleanPayload({
            ...(name && { name }),
            ...(description && { description }),
            ...(summary && { summary }),
            ...(oldPrice && { oldPrice }),
            ...(price && { price }),
            ...(salePercent && { salePercent }),
            ...(category && { category }),
            ...(stock && { stock }),
            ...(installment && { installment }),
            ...(imageUrl && { imageUrl }),
            ...(manufacturarName && { manufacturarName }),
            ...(productsId && { productsId }),
            ...(shipping && { shipping }),
            ...(updatedProcessor || updatedMemory || updatedDisplay || updatedCamera || updatedColor
                ? {
                      specifications: {
                          ...(updatedProcessor && { processor: updatedProcessor }),
                          ...(updatedMemory && { memory: updatedMemory }),
                          ...(updatedDisplay && { display: updatedDisplay }),
                          ...(updatedCamera && { camera: updatedCamera }),
                          ...(updatedColor && { color: updatedColor }),
                      },
                  }
                : {}),
        });        

        console.log("Check payload:", updatedProcessor)
        // Kiểm tra nếu không có trường nào để cập nhật
        if (Object.keys(payLoad).length === 0) {
            return res.status(400).json({
                message: "Không có trường nào được cập nhật",
                success: false,
                error: true,
            });
        }

        // Kiểm tra sản phẩm có tồn tại
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Không tồn tại sản phẩm",
                error: true,
                success: false,
            });
        }

        // Cập nhật sản phẩm
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            payLoad,
            { new: true }
        );

        console.log("check product being update:", updatedProduct)

        res.status(200).json({
            data: updatedProduct,
            message: "Cập nhật sản phẩm thành công",
            success: true,
            error: false,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Lỗi server, vui lòng thử lại sau.",
            success: false,
            error: true,
        });
    }
}

module.exports = UpdateProductController;
