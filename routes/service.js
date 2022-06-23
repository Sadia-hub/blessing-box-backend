const express = require("express")

const ServiceController = require("../controllers/ServiceController")
const router = express.Router()

router.route("/service")
.post(ServiceController.addService)
.get(ServiceController.getServices)

module.exports = router