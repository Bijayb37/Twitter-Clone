const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

mongoose.set("debug", true)
mongoose.connect('mongodb://localhost:27017/first', {useNewUrlParser: true, useUnifiedTopology: true})


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }
})

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next()
        }
        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return next()
    }   catch (err) {
        return next(err)
    }
})

userSchema.method.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        return next(err)
    }
}

const User = new mongoose.model("User", userSchema)

module.exports = User
