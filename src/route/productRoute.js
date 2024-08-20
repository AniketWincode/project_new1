const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controller/productController');
const { uploader } = require("../middlewares/multerMiddleware")

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/', deleteProduct);



module.exports = {
    productRouter,
}