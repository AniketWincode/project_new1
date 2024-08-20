const express = require('express');
const { addProduct } = require('../controller/productController');
const { uploader } = require("../middlewares/multerMiddleware")

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct);

module.exports = {
    productRouter
}