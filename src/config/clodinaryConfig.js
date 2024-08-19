const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SCREAT } = require('./serverConfig')

const cloudinary = require('cloudinary').v2

// configuring cloudinary
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_SCREAT,
    api_secret: CLOUDINARY_API_SCREAT
});

module.exports = {
    cloudinary
}