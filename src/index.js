const express = require("express")
const bodyParser = require('body-parser')
const { PORT } = require("./config/serverConfig")
const { connectDB } = require("./config/dbconfig")

const app = express()

// reading of data
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message : "pong"})
})

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT} ...!!`) 
    await connectDB();
    console.log("Server started");
});

// ambedreb21
// gDs7BpJgxHPZWzWV