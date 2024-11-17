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
                required: false 
            },
            memory: { 
                type: String, 
                required: false
            },
            display: { 
                type: String, 
                required: false 
            },
            camera: { 
                type: String, 
                required: false 
            },
            color: {
                type: String,
                required : false
            }
        },
    },
    {
        timestamps: true
    }
);
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;