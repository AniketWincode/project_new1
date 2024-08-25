const express = require('express');
const { login, logout } = require('../controller/authController');

// We have to initialise a router object to add routes in a new file
// Router are used for segregating your routes in different modules
const authRouter = express.Router();

authRouter.post('/login', login); // this is route registration
authRouter.post('/logout', logout);

module.exports = {
    authRouter
}