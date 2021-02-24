const {User, Message} = require("../models")

exports.CreateMessage = async function(req, res, next) {
    try {
     let message = await Message.create({
        text: req.body.text,
        user: req.params.id
     })

     let foundUser = await User.findById(req.params.id)
     foundUser.message.push(message.id)
     await foundUser.save()
     let foundMessage = await Message.findById(message._id)
     .populate("user", {
         username: true,
         profileImageUrl: true
     })
     return res.status(200).json(foundMessage)
    } catch (err) {
        return next(err)
    }
}

// api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
    try {
        const message = await Message.findById(req.params.message_id)
        return res.status(200).json({
            message: message.text
        })
    }   catch (err) {
        return next(err)
    }
}

// api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
    try {
        const message = await Message.findByIdAndDelete(req.params.message_id)
        return res.status(200).json({
            removedStatus: "deleted",
            message: message.text
        })
    }   catch (err) {
        return next(err)
    }
}