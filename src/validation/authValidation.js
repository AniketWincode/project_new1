const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unauthorisedError');
// const { User } = require('../schema/userSchema');

async function isLoggedIn(req, res, next){
    const token = req.cookies["authToken"]; // authToken is name of cookie
    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // decoding the token
        console.log("decoded", decoded);
        if(!decoded){
            throw new UnAuthorisedError();
        }
        // if reached here, then user is authenticated allow them to access the api

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: 'ADMIN'
        }
        console.log("IsLoggedIn")
        console.log("req.user", req.user)
        next();
    } catch (error) {
        return res.status(401).json({
            success: false, 
            data: {},
            error: error,
            message: "Invalid Token provided"
        });
    }
    // if(!decoded){
    //     return res.status(401).json({
    //         success: true, 
    //         data: {},
    //         eroor: "Not authenticated",
    //         message: "Invalide Token provided"
    //     });
    // }
}

/**This function check if the authenticted user is an admin or not
 * Because we will call isAdmin after isLoggedIn thats why we will receive user details
*/
async function isAdmin(req, res, next) {
    const loggedInUser = req.user; // fetched the role
    console.log("loggedInUser", loggedInUser)
    // const response = await User.findById('66caf72341e196790bc43656')
    // console.log(response)
    if(loggedInUser.role === 'ADMIN'){
        console.log("User is an admin")
        next();
    }
    else{
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not authorised for this activity",
            error: {
                statusCode: 401, 
                reason: "Unauthorised use for this action"
            }
        }) 
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}

// client - middleware - controller