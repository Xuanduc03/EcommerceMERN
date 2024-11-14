const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name : {
            type: String, 
            required: true
        },
        summary: {
            type: String,
        },
        description : {
            type: String, 
            required: true
        },
        price : {
            type: Number, 
            required: true
        },
        category : {
            type: String, 
            required: true
        },
        stock : {
            type: String, 
            required : true
        },
        shipping : {
            type: String
        },
        imageUrl : {
            type: String,
        },
        manufacturarName: {
            type: String,
        },
        productId : {
            type : Number
        },
        specifications: {
            processor: { 
                type: String, 
                required: true 
            },
            memory: { 
                type: String, 
                required: true
            },
            display: { 
                type: String, 
                required: true 
            },
            storage: { 
                type: String, 
                required: true 
            },
            color: {
                type: String,
                required : true
            }
        },
    },
    {
        timestamps: true
    }
);
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;