const multer = require('multer')

const uploader = multer({ // it return uploader middleware
    dest: 'uploads/'
});

module.exports = {
    uploader
}