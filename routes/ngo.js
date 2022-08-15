const express = require("express")
const middleware = require("../middlewares/")
const ngoController = require("../controllers/ngoController")


const router = express.Router()

router.route("/ngo")
 .get(ngoController.getNgos) //approved ngos
.post( ngoController.addNgo)

// router.route("/ngo/:status").get(ngoController.getNgos) //approved ngos

router.route("/ngo/:id")
//.get(ngoController.getNgo)
.get(ngoController.getNgoByID)
.put(ngoController.updateNgo)
.delete(middleware.hasToken, ngoController.deleteNgo)

router.route("/ngodetails/:id").get(ngoController.getNgoBYItsID) //by Megha

router.route("/ngoservice/:service").get(ngoController.getNGOByService)

router.route("/ngo/:id/status/:status")
.get(ngoController.approveNGO)

router.route("/ngos/:id")
.get(ngoController.checkUserHasNgo)

router.route("/pendingngos").get( ngoController.getPendingNGOs);
// router.route("/ngos")
// .get(ngoController.getNgos)

module.exports = router