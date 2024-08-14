const express = require("express")
const { PORT } = require("./config/serverConfig")
const { connectDB } = require("./config/dbconfig")

const app = express()

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT} ...!!`) 
    await connectDB();
    console.log("Server started");
});



// ambedreb21
// gDs7BpJgxHPZWzWV