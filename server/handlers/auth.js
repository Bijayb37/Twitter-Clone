const {User} = require("../models")
const jwt = require('jsonwebtoken')

exports.signin = async function(req, res, next) {
    //finding a user
    try {
        const usr = await User.findOne({
            email: req.body.email
        })
        const {email, id, username, profileImageUrl} = usr
        
        //chekng if passwords match
        const isMatch = await usr.comparePassword(req.body.password)
        //if it all matches log them in
        
        if (isMatch) {
            const token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
            //secret key created using dotenv .env
                process.env.SECRET_KEY
            )
            return res.status(200).json({
                id,
                username,
                email,
                token,
                profileImageUrl
            })
        } else {
            return next({status: 400, message: "Invalid Email or Password"})
        }
    } catch (err) {
        return next({status: 400, message: "Invalid Email or Password"})
    }

}

exports.signup = async function(req, res, next) {
    try {
        //create a user using mongoose and save it to the const user
        const user = await User.create(req.body) 
        //destructure items from user
        const {email, id, username, profileImageUrl} = user
        //create jsonwebtoken 
        const token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
        //secret key created using dotenv .env
            process.env.SECRET_KEY
        )
        //send back json with user information 
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token,
            email
        })
    } catch (err) {
        //error code for validaiton fails
        if (err.code === 11000) {
            err.message = "Sorry, that username or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}