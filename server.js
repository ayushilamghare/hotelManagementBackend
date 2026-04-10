const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const cors = require("cors")

//load the enviornmental variables
dotenv.config()

//initailize the application
const app = express()

//connect db
connectDB()

//to parse data post, put
app.use(express.json())
//middleware cross origin request
app.use(cors())

//define the route
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api", require("./routes/paymentRoutes"))

//start the server

app.listen(process.env.PORT, ()=>{
    console.log("Server started at port 5009")
})