const express = require("express")
const middleware = require("../middlewares/")
const ngoController = require("../controllers/ngoController")


const router = express.Router()

router.route("/ngo")
.get(ngoController.getNgos) //approved ngos
.post(middleware.hasToken, ngoController.addNgo)

router.route("/ngo/:id")
.get(ngoController.getNgo)
.put(ngoController.updateNgo)
.delete(ngoController.deleteNgo)

router.route("/ngo/:id/status/:status")
.get(ngoController.approveNGO)

// router.route("/ngos")
// .get(ngoController)

module.exports = router