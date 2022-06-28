const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.route("/users")
.post(userController.addUser)

router.route("/verify/:id")
.get(userController.verifyUser);

router.route("/user")
.post(userController.getUser) //get user by id


module.exports = router;