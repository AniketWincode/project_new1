const express = require('express');
const { getCartByUser, modifyProductToCart, clearCartById } = require('../controller/cartController');
const { isLoggedIn } = require('../validation/authValidation');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn,  getCartByUser);

cartRouter.post('/operation/:productId',isLoggedIn, modifyProductToCart);

cartRouter.delete('/products', isLoggedIn, clearCartById)

module.exports = {
    cartRouter
}