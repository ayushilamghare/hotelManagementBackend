const express = require("express")
const router = express.Router()
const {registerUser,
       loginUser,
       getHome,
       getAllUsers
} = require("../controller/userController")

router.post("/register" ,registerUser)
router.post("/login", loginUser)
router.get("/home", getHome)
router.get("/all", getAllUsers)


module.exports= router