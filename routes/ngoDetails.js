const express = require("express")
const middleware = require("../middlewares")
const ngoDetails = require('../controllers/ngoDetailsController'); 

const router = express.Router()

router.route("/ngodetails").post( ngoDetails.addDetails)
router.route("/ngodetails").get( ngoDetails.getAllData)
module.exports = router