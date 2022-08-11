const express = require("express")
const contactController = require("../controllers/contactController")

const router = express.Router()

router.route("/contact")
 .get(contactController.getAllQureies) 
.post( contactController.sendQuery)

router.route("/contact/:id").get(contactController.getQueryById) 

router.route("/sendreply").post( contactController.sendReply)

module.exports = router