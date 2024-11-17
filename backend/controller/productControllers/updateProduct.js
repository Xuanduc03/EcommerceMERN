const ProductModel = require("../../models/productModel");
const mongose = require('mongoose')

async function UpdateProductController(req, res) {
    try {
        const {productId, name, description, summary, oldPrice, price, salePercent, category, stock,installment, imageUrl, manufacturarName, productsId, shipping,processor, memory, display, camera, color } = req.body;

        if(!mongose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({
                message: "ProducId is not valid",
                success: false,
                error: true
            })
        }
        const payLoad = {
            ...(name && {name}),
            ...(description && {description}),
            ...(summary && {summary}),
            ...(price && {price}),
            ...(category && {category}),
            ...(stock && {stock}),
            ...(imageUrl && {imageUrl}),
            ...(manufacturarName && {manufacturarName}),
            ...(productsId && {productsId}),
            ...(shipping && {shipping}),
            ...(processor && {processor}),
            ...(memory && {memory}),
            ...(display && {display}),
            ...(camera && {camera}),
            ...(color && {color}),
            ...(storage && {storage}),
            ...(oldPrice && {oldPrice}),
            ...(salePercent && {salePercent}),
            ...(installment && {installment}),
        }

        if(Object.keys(payLoad).length === 0){
            return res.status(400).json({
                message: "Không có trường nào được cập nhật",
                success: false,
                error: true
            })
        }

        const product = await ProductModel.findById(productId);

        if(!product) {
            return res.status(401).json({
                message: "Không tồn tại sản phẩm",
                error: true,
                success: false
            })
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, payLoad, {new :true});

        res.status(200).json({
            data : updatedProduct,
            message: "Cập nhật sản phẩm thành công",
            success : true,
            error: false
        })
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message : "ERROR",
            success: false,
            error: true
        })
    }
}

module.exports = UpdateProductController;