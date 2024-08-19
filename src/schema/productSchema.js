const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName : {
        type: String, 
        required: [true, "Product name is required"],
        minLength: [5, "Product naem must be atleat 5 chracters"],
        trim : true
    },
    decription : {
        type: String, 
        minLength: [5, "Product decription must be 5 characters"]
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', "drinks", "sides"],
        default: veg
    },
    inStock: {
        type: Boolean,
        required: [true, "In stock is required"],
        default: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema)

module.exports = {
    Product
}