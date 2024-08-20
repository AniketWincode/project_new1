const { cloudinary } = require("../config/clodinaryConfig");
const { createProduct, getProductById, deleteProductById } = require('../service/productService'); 
const AppError = require("../utils/appError");

async function addProduct(req, res) {
    try {
        const product = await createProduct({
        productName: req.body.productName,
        description: req.body.description,
        imagePath: req.file.path,
        price: req.body.price,
        category: req.body.category, // if category is undefined veg will be stored
        inStock: req.body.inStock // if inStock is undefines then true will be stored
    });
    return res.status(201).json({
        success: true, 
        message: 'Succesfully created a product',
        error: {},
        data: product
    });
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                data: {},
                error: error
            });
    }
}

async function getProduct(req, res) {
    try {
        const respone = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Succesfully fetched the product',
            error: {},
            data: respone
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                data: {},
                error: error
            });
    }
}

async function deleteProduct(req, res) {
    try {
        const respone = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Succesfully deleted the product',
            error: {},
            data: respone
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                data: {},
                error: error
            });
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}