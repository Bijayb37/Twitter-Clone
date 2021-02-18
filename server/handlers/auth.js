const User = require("../models/user")
const jwt = require('jsonwebtoken')

exports.signin = function() {}

exports.signup = async function(req, res, next) {
    try {
        //create a user using mongoose and save it to the const user
        const user = await User.create(req.body) 
        //destructure items from user
        const {id, userName, profileImageUrl} = user
        //create jsonwebtoken 
        const token = jwt.sign({
            id,
            userName,
            profileImageUrl
        },
        //secret key created using dotenv .env
            process.env.SECRET_KEY
        )
        //send back json with user information 
        return res.status(200).json({
            id,
            userName,
            profileImageUrl,
            token
        })
    } catch (err) {
        //error code for validaiton fails
        if (err.code === 1100) {
            err.message = "Sorry, that username or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}