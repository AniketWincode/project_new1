const mongoose = require('mongoose')
const serverConfig = require('./serverConfig')

/**
 * The below function help us to connect the mongodb server
 */

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL)
        console.log("Succesfully connect to the mongo db server .....!")
    } catch (error) {
        console.log("Not able to connect the mongodb server")
    }
}


module.exports = {
    connectDB
}