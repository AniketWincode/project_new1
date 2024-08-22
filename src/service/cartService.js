const { getCartByUserId } = require("../repositories/cartRepository");
const NotFoundError = require("../utils/NotFoundError");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }
    return cart;
}

module.exports = {
    getCart
}