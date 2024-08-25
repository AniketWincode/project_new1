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
const { uploader } = require("./middlewares/multerMiddleware")
const { cloudinary }  = require("./config/clodinaryConfig")
const fs = require("fs/promises") // node js module it help to  give the access of file
const path = require("path")
const { Product } = require("./schema/productSchema")
const { productRouter } = require("./route/productRoute")
const { error } = require("console")
const { orderRouter } = require("./route/orderRoutes")

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
app.use('/product', productRouter); // This is different request from '/photo'
app.use('/orders', orderRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    // controller
    console.log("Hello")
    // console.log(req.body);
    console.log(req.cookies);
    return res.json({message : "pong"})
})

// uploader is middleware create in middlewares multerMiddleware.js

// incoming file it is postman filename key name
app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file)
    const result = await cloudinary.uploader.upload(req.file.path) // req.file.path
    // console.log("result from cloudinary", result)
    // console.log(result.url)
    await fs.unlink(req.file.path) // this is the path of the file
    return res.json({message : 'ok'})
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