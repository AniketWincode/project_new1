const { Product } = require('../schema/productSchema');
const BadRequestError = require('../utils/BadRequestError');
const InternalServerError = require('../utils/InternalServerError');

async function createProduct(productsDetails) {
    try {
        const response = await Product.create(productsDetails);
        return response;
    } catch (error) {
        if(error.name == 'validationError'){
            const errorMessageList = Object.keys(error.erros).map((property) => {
                return error.erro[property].message
            })
            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError();
    }
}

async function getProductById(productId) {
    try {
        const respone = await Product.findById(productId);
        return respone
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