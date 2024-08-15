const express = require('express');
const { getCartById } = require('../controller/cartController');

const cartRouter = express.Router();

cartRouter.get('/:id', getCartById);

module.exports = {
    cartRouter
}