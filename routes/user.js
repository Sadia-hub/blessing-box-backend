const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()
const middleware = require("../middleware/");
router.route("/users")
.post(userController.addUser).get(userController.getAllUsers)
router.route("/verify/:id")
.get(userController.verifyUser);


router.route("/user/:id").patch(  userController.updateUser).get(userController.getUserByID)
.delete(middleware.hastoken, userController.deleteUser);
router.route("/user").post(userController.getUser) //get user by id

router.route("/changepassword/:id").post(userController.changePassword)

module.exports = router;