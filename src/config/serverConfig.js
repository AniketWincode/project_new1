const dotenv = require('dotenv')
dotenv.config() 


// Here we are exporting all the env variables that the project uses
module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    CLOUDINARY_API_SCREAT: process.env.CLOUDINARY_API_SCREAT,
    CLOUDIARY_API_KEY: process.env.CLOUDIARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
}