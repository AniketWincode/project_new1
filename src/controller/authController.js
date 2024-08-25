const { loginUser } = require("../service/authService")

async function login(req, res) {

    const loginPayLoad = req.body

    try {
        // authservice
        // console.log("loginPayLoad", loginPayLoad)
        // console.log("AuthToken")
        const response = await loginUser(loginPayLoad);
        // console.log("AuthToken")
        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // One week in milliseconds
          })
          
        // console.log("AuthToken")

        return res.status(200).json({
            success : true, 
            message : "Logged in successfully",
            error: {},
            data : {}
        })
    } catch (error) {
        return res.status(501).json({
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