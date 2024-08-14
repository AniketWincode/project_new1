const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First name is required"],
        minLength : [5, "First must be atleast 5 chracter long"],
        lowercase : true,
        maxlength : [20, "First name should be less than or equal to 20 chracters"]
    },

    lastName : {
        type : String,
        required : [true, "LastName name is required"],
        minLength : [5, "LastName must be atleast 5 chracter long"],
        lowercase : true,
        maxlength : [20, "LastName should be less than or equal to 20 chracters"]
    },

    mobileNumber : {
        type : String,
        trim : true,
        maxlength : [10, "Phone number should be of length 10"],
        minlength : [10, "Phone number should be of length 10"],
        unique : [true, "Phone number is already in use"],
        required : [true, "Phone number should be privided"]
    },
    
    email : {
        type : String,
        trim : true,
        required : [true, "Email should be provided"],
        unique : [true, "Email is already in use"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email"]
    },
    
    password : {
        type : String,
        required : [true, "Password should be provided"],
        minlength : [6, "Password should be minimum 6 chracter long"]
    }
}, {timestamps : true})

const User = mongoose.model('User', userSchema) // covert to the collection

module.exports =  {
    User
}