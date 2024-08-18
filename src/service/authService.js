const { findUser } = require("../repositories/userRepository")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig')

async function loginUser(authDetails) {
    const email = authDetails.email
    const plainPassword = authDetails.plainPassword

    // 1. Check if there is a registered user with the given email
    const user = await findUser(email);

    if(!user){
        throw {message : "No user found with the given email", statusCode: 404}
    }

    // 2. If the user us found we need to compare plaincomingpassword with hashpassword
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password); // plainPassword, increptedPassword it convert the password into hash then it will compare
    if(isPasswordValidated){
        throw {message : "Invalid password, please try again", statusCode: 401};
    }

    // 3. If the password is validated, create a token and return it
    const token = jwt.sign({email : user.email, id : user._id}, JWT_SECRET, {
        expiresIn : JWT_EXPIRY
    });

    return token;
}

module.exports = {
    loginUser
}