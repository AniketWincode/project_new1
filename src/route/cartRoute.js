const express = require('express');
const { getCartByUser } = require('../controller/cartController');
const { isLoggedIn } = require('../validation/authValidation');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn,  getCartByUser);

module.exports = {
    cartRouter
}