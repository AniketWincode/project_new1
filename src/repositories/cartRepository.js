const Cart = require('../schema/cartSchema')
async function createCart(userId){
    try {
        const newCart = await Cart.create({
            user: userId
        });
        return newCart;
    } catch (error) {
        if(error.name == 'validationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.erro[property].message
            })
            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError();
    }
}

async function getCartByUserId(userId){
    try {
        const cart = await Cart.findOne({
            user : userId
        }).populate('items.product'); // 
        return cart;
    } catch (error) {
        console.log(error)
        throw new InternalServerError();
    }
}

module.exports = {
    createCart,
    getCartByUserId
}