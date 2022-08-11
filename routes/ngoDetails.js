const express = require("express")
const middleware = require("../middlewares")
const ngoDetails = require('../controllers/ngoDetailsController'); 

const router = express.Router()

router.route("/ngodetails").post( ngoDetails.addDetails)
router.route("/ngodetails").get( ngoDetails.getAllData)
//router.route("/create-checkout-session/multiple").post(ngoDetails.addAccountDetail)

router.post('/create-checkout-session/multiple', ngoDetails.addAccountDetail);
    

module.exports = router