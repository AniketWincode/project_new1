const { Product } = require('../schema/productSchema')

async function createProduct(productsDetails) {
    try {
        const response = await Product.create(productsDetails);
        return response;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProduct
}