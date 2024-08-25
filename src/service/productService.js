const { cloudinary } = require("../config/clodinaryConfig");
const ProductRespository = require('../repositories/productRepository')
const fs = require('fs/promises');
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");
async function createProduct(productsDetails){
    try {
        // 1. We should check if an image is coming to create the product, then we should first upload it on cloudinary
        const imagePath = productsDetails.imagePath;
        if(imagePath) {
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
                var productImage = cloudinaryResponse.secure_url; // it gives url 
                // await fs.unlink(process.cwd() + "/" + imagePath);
            } catch (error) {
                console.log(error)
                throw new InternalServerError();
            }
        }

        // 2. Then use the url from cloudinary abd other product details to add product in
        const product = ProductRespository.createProduct({
            ...productsDetails,
            productImage: productImage
        });
        
        if(!product){
            throw {reason: 'Not able to create product', statusCode: 500}
        }
        return product;
    } catch (error) {
        console.log(error)
    }
}

async function getProductById(productId){
    const response = await ProductRespository.getProductById(productId);
    if(!response){
        throw new NotFoundError(`Product`)
    }
    return response
}

async function deleteProductById(productId){
    const response = await ProductRespository.deleteProductById(productId)
    if(!response){
        throw new NotFoundError('Product')
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}