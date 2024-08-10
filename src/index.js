const express = require("express")

const dotenv = require('dotenv')
dotenv.config() 
const PORT = process.env.PORT // process.env node to read

const app = express()

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} ...!!`) 
})