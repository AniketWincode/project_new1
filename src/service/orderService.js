const { clearCart, getCartByUserId } = require("../repositories/cartRepository");
const { createNewOrder } = require("../repositories/orderRepository");
const { findUser } = require("../repositories/userRepository");
const BadRequestError = require("../utils/BadRequestError");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createOrder(userId, paymentMethod) {

    const cart = await getCartByUserId(userId);
    const user = await findUser({_id : cart.user});
    if(!cart) {
        throw new NotFoundError("Cart");
    }

    if(cart.items.length == 0){
        throw new BadRequestError(["Cart is empty, Please add some items to the cart"]);
    }

    const orderObject = {}; // creating new object

    orderDetails.user = cart.user;
    // orderObject.items = cart.items;
    orderObject.items = cart.items.map(cartItem => {
        return {product: cartItem.product_id, quantity: cartItem.quantity}
    });
    
    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.quantity;
    });

    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject);

    if(!order){
        throw new InternalServerError();
    }

    await clearCart(userId);

    return order;

}

module.exports = {
    createOrder
}