const express = require("express")
const middleware = require("../middlewares")
const proofController = require("../controllers/proofController")


const router = express.Router()


router.route('/proof').post(proofController.addProof).get(proofController.getProofByProject);


module.exports = router