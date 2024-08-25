const express = require('express');
const { createNewOrder, getAllOrdersByUser, getOrder, cancelOrder, changeOrderStatus } = require('../controller/orderController');
const { isLoggedIn, isAdmin } = require('../validation/authValidation');

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createNewOrder);
orderRouter.get('/', isLoggedIn, getAllOrdersByUser);
orderRouter.post('/:id', isLoggedIn, getOrder);
orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrder);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin,  changeOrderStatus)

module.exports = {
    orderRouter
}