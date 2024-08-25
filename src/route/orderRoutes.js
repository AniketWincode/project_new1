const express = require('express');
const { createNewOrder } = require('../controller/orderController');
const { isLoggedIn } = require('../validation/authValidation');

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createNewOrder);

module.exports = {
    orderRouter
}