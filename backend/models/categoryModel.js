const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl : {
      type: String,
      required : false
    },
    status: {
        type: String,
        default: "Hiển thị",
    },
    subCategories:[
        {
          name: {
            type: String,
            required: false
          }
        }
      ]
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;