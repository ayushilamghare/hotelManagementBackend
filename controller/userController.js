const User = require("../models/User")

// registration of user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword} = req.body

        if(!name || !email || !password || !confirmPassword){
            res.status(400).json({
                message: "All Fields are required"
            })
        }

        if(password !== confirmPassword){
            res.status(400).json({
                message: "Passwords donot match"
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400).json({
                message: "user already exists!"
            })
        }

        //create a user

        const user = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            message: "user is registered succesfully!",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//for login 
exports.loginUser = async (req, res) => {
    try {
        const {email, password } = req.body
        const user = await User.findOne({ email })

        if (!user || user.password !== password) {
            res.status(400).json({
                message: "Invalid credentails!"
            })
        }

        res.status(201).json({
            message: "Login Successfull",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Get all registered users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        res.status(200).json({
            message: "All registered users retrieved successfully",
            count: users.length,
            users
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getHome = async(req, res) =>{
   res.status(200).json({
    message: "Hi this is Home page"
   })
}
