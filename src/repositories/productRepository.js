const { Product } = require('../schema/productSchema');
const BadRequestError = require('../utils/BadRequestError');
const InternalServerError = require('../utils/internalServerError');

async function createProduct(productsDetails) {
    try {
        const response = await Product.create(productsDetails);
        return response;
    } catch (error) {
        if(error.name === 'validationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message
            })
            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError();
    }
}

async function getProductById(productId) {
    try {
        const response = await Product.findById(productId);
        return response
    } catch (error) {
        console.log(error)
        throw new InternalServerError()
    }
}

async function deleteProductById(productId){
    try {
        const response = await Product.findByIdAndDelete(productId)
        return response;
    } catch (error) {
        console.log(error)
        throw new InternalServerError();
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}