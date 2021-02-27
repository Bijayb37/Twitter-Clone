const express = require("express")
const { CreateMessage, getMessage, deleteMessage, editMessage} = require("../handlers/messages")
const router = express.Router({mergeParams: true})

router.route("/").post(CreateMessage)
router.route("/:message_id/edit").patch(editMessage)
router.route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router