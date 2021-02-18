require("dotenv").config()
const express = require('express')
const app = express()
const errorHandler = require('./handlers/error')
const User = require("./models/user")
const authRoutes = require("./routes/auth")

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use("/api/auth", authRoutes)

app.use((req, res, next) => {
    let err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use(errorHandler)

app.listen("3001", () => {
    console.log("connection open on port 3000")
})