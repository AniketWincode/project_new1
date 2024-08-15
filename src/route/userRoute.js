// Resource User
// /user

const express = require('express');
const { createUser } = require('../controller/userController');

// We have to initialise a router object to add routes in a new file
// Router are used for segregating your routes in different modules
const useRouter = express.Router();

useRouter.get('/create', createUser); // this is route registration

module.exports = {
    useRouter
}







