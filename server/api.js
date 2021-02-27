require("dotenv").config()
const express = require('express')
const app = express()
const errorHandler = require('./handlers/error')
const {Message} = require("./models")
const authRoutes = require("./routes/auth")
const messageRoutes = require("./routes/messages")
const {loginRequired, ensureCorrectUser} = require("./middleware/auth")
const {updateLikes} = require("./handlers/messages")

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use("/api/auth", authRoutes)
app.patch("/api/users/:id/messages/:message_id", updateLikes)
app.use("/api/users/:id/messages", loginRequired,ensureCorrectUser, messageRoutes)

app.get("/api/messages", async function(req,res,next) {
    try {
        const message = await Message.find().sort({createdAt: "desc"})
        .populate("user", {
            username: true,
            profileImageUrl: true
        })
        return res.status(200).json(message) 
    } catch (err) {
        return next(err)
    }
})

app.use((req, res, next) => {
    let err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use(errorHandler)

app.listen("3001", () => {
    console.log("connection open on port 3000")
})