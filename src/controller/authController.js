const { loginUser } = require("../service/authService")

async function login(req, res) {

    try {
        const loginPayLoad = req.body
        // authservice
        const response = await loginUser(loginPayLoad);

        res.cookie("authToken", response, {
            httpOnly : true, 
            secure : false,
            maxAge : 7 * 24 * 60 * 1000
        });

        return res.status(200).json({
            success : true, 
            message : "Logged in successfully",
            data : {},
            error : {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success : false,
            data : {},
            message : error.message,
            error : error
        })
    }
}

module.exports = {
    login
}