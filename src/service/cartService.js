const { getCartByUserId } = require("../repositories/cartRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");
const { getProductById } = require("./productService");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }
    return cart;
}

async function modifyCart(userId, productId, shouldAdd = true){
    const quatityValue = (shouldAdd == true) ? 1 : -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if(!product){
        throw new NotFoundError("Product")
    }
    if(!product.inStock && product.quantity <= 0){
        throw new BadRequestError(["Product not available in stock"]);
    }

    // may be product is already in the stock
    let foundProduct = false;
    cart.items.forEach(item => {
        if(item.product._id == productId){ // VIMP // item.product.toString() === productId
            if(shouldAdd){
                if(product.quantity >= item.quantity + 1){
                    item.quantity += quatityValue;
                }
                else{
                    throw new AppError("The quantity of the item requested is not available", 404);
                }
            }
            else{
                if(item.quantity > 0){
                    item.quantity += quatityValue
                    if(item.quantity == 0){
                        cart.items = cart.items.filter(item => item.product._id != productId); // remove the product from the cart when product quantity is is zero
                        foundProduct = true 
                        return;
                    }
                }
                else{
                    throw new AppError("Th quantity of the item requested is not available", 404);
                }
            }
            foundProduct = true
        }
    });

    if(!foundProduct){
        if(shouldAdd){
            cart.items.push({
            product: productId,
            quantity: 1
           }) 
        }
        else{
            throw new NotFoundError("Product in the cart");
        }
    }

    await cart.save(); // save the all changes in mongodb 

    product.quantity -= 1;
    
    await product.save();
    
}

module.exports = {
    getCart,
    modifyCart
}