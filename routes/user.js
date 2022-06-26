const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.route("/users")
.post(userController.addUser)

router.route("/user/:id")
.post(userController.getUser) //get user by id
.put(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router;