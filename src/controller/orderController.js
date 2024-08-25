const { updateOrderStatus, getOrderById } = require("../repositories/orderRepository");
const { createOrder, getAllOrdersCreatedByUser, updateOrder } = require("../service/orderService");

async function createNewOrder(req, res){
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message: "Succesfully created the order",
            error: {},
            data: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function getAllOrdersByUser(req, res){
    try {
        const order = await getAllOrdersCreatedByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Succesfully fetched the order",
            error: {},
            data: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function getOrder(req, res){
    try {
        const order = await getOrderById(req.params.orderId);
        return res.json({
            success: true,
            message: "Succesfully fetched the order",
            error: {},
            data: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function cancelOrder(req, res){
    try {
        const order = await updateOrder(req.params.id, "CANCELLED");
        return res.json({
            success: true,
            message: "Succesfully updated the order",
            error: {},
            data: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}


async function changeOrderStatus(req, res){
    try {
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.json({
            success: true,
            message: "Succesfully updated the order",
            error: {},
            data: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}


module.exports = {
    createNewOrder,
    getAllOrdersByUser,
    getOrder,
    cancelOrder,
    changeOrderStatus
}