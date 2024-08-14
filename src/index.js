const express = require("express")
const bodyParser = require('body-parser')
const { PORT } = require("./config/serverConfig")
const { connectDB } = require("./config/dbconfig")
const { User } = require("./schema/userSchema")

const app = express()

// reading of data
app.use(bodyParser.json()); // express.json()
app.use(bodyParser.text()); // express.text()
app.use(bodyParser.urlencoded());  express.urlencoded({extended : true})

app.post('/ping', (req, res) => {
    console.log("Hello")
    console.log(req.body);
    return res.json({message : "pong"})
})

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT} ....!`) 
    await connectDB();
    console.log("Server started");

    // const newUser = await User.create({
    //     email : "a@b.com",
    //     password : '123456',
    //     firstName : 'johndoe',
    //     lastName : 'a@@@@@',
    //     mobileNumber : '1234567899'
    // })

    // console.log("Created new user");
    // console.log(newUser)
});

// ambedreb21
// gDs7BpJgxHPZWzWV