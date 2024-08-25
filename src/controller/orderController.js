const { createOrder } = require("../service/orderService");

async function createNewOrder(req, res){
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.json({
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

module.exports = {
    createNewOrder
}