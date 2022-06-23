const express = require("express")

const ServiceAreaController = require("../controllers/ServiceAreaController")
const router = express.Router()

router.route("/servicearea")
.get(ServiceAreaController.getServiceArea)

module.exports = router