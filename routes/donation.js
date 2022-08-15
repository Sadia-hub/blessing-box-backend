const express = require("express")
const middleware = require("../middlewares/")
const donationController = require("../controllers/donationController")


const router = express.Router()

router.route('/create-payment-intent').post(donationController.donateForMobile)
router.route('/create-checkout-session').post(donationController.donate);


module.exports = router