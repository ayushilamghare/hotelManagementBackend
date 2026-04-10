const mongoose = require("mongoose")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match:[emailRegex, "Enter valid email"]
    },
    password:{
        type: String,
        required:[true,"Password is required"],
        minLength : [6, "Password must be of atleast 6 characters"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)