const express = require("express")
const middleware = require("../middlewares/")
const donationController = require("../controllers/donationController")


const router = express.Router()
router.route('/sse').get(donationController.serverSentEvents) 
router.route('/create-payment-intent').post(donationController.donateForMobile) //Mobile donation
router.route('/create-checkout-session').post(donationController.donate);
router.route('/adddonation').post(donationController.addDonationToDb) //store donation in db 
router.route('/getdonation/:id').get(donationController.donationOfProject) // specific project donation

module.exports = router