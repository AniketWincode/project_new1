const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { PORT } = require("./config/serverConfig")
const { connectDB } = require("./config/dbconfig")
const { User } = require("./schema/userSchema")
const { userRouter } = require("./route/userRoute")
const { cartRouter } = require("./route/cartRoute")
const serverConfig = require("./config/serverConfig")
const { authRouter } = require("./route/authRoute")
const { isLoggedIn } = require("./validation/authValidation")

const app = express()

// reading of data
app.use(cookieParser());
app.use(bodyParser.json()); // express.json()
app.use(bodyParser.text()); // express.text()
app.use(bodyParser.urlencoded());  // express.urlencoded({extended : true})

// routes
// Routuing middleware
// if your req route starts with /users then handle it using userRouter
app.use('/users', userRouter); // connect the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    // controller
    console.log("Hello")
    // console.log(req.body);
    console.log(req.cookies);
    return res.json({message : "pong"})
})

app.listen(serverConfig.PORT, async () => {
    console.log(`Server started at port ${serverConfig.PORT} ....!`) 
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