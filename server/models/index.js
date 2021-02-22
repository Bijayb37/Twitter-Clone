const mongoose = require("mongoose")
// mongoose.set("debug", true)
mongoose.connect('mongodb://localhost:27017/first', {useNewUrlParser: true, useUnifiedTopology: true})

module.exports.User = require('./user')
module.exports.Message = require('./message')