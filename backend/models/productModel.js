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
        oldPrice : {
            type: Number,
            required: true
        },
        price : {
            type: Number, 
            required: true
        },
        salePercent : {
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
        installment : {
            type: String
        },
        imageUrl : {
            type: String,
        },
        manufacturarName: {
            type: String,
        },
        productsId : {
            type : Number
        },
        specifications: {
            processor: { 
                type: String, 
            },
            memory: { 
                type: String, 
            },
            display: { 
                type: String, 
            },
            camera: { 
                type: String, 
            },
            color: {
                type: String,
            }
        },
    },
    {
        timestamps: true
    }
);
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;