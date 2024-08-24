const { getCart, modifyCart } = require("../service/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res) {
    try {
        const cart = await getCart(req.user.id); // req.body.id
        console.log("cart", cart);p
        return res.status(200).json({
            success: true, 
            message: "Succcessfully fetched the cart",
            error: {}, 
            data: cart 
        });
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

async function modifyProductToCart(req, res) {
    try {
        const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add"); // req.body.id
        console.log("cart", cart);p
        return res.status(200).json({
            success: true, 
            message: "Succcessfully added to the cart",
            error: {}, 
            data: cart 
        });
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
    getCartByUser,
    modifyProductToCart
}