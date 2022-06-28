const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()
const middleware = require("../middleware/");
router.route("/users")
.post(userController.addUser)

router.route("/verify/:id")
.get(userController.verifyUser);


router.route("/user/:id").patch( middleware.hastoken, userController.updateUser)
.delete(middleware.hastoken, userController.deleteUser);
router.route("/user").post(userController.getUser) //get user by id


module.exports = router;