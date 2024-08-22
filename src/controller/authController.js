const { loginUser } = require("../service/authService")

async function login(req, res) {

    try {
        const loginPayLoad = req.body
        // authservice
        const response = await loginUser(loginPayLoad);

        res.cookie("authToken", response.token, {
            httpOnly : true, 
            secure : false, //able to access on http server
            maxAge : 7 * 24 * 60 * 60 * 1000 // token expiry
        });

        return res.status(200).json({
            success : true, 
            message : "Logged in successfully",
            data : {},
            error : {}
        })
    } catch (error) {
        return res.status(401).json({
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