const mongoose = require("mongoose");

//function to connect to mongoose

const connectDB = async (req , res) =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected successfully")
    } catch (error) {
        console.log("DB Error")
    }
}

module.exports = connectDB