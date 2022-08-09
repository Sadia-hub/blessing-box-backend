const express = require("express")
const projectController = require("../controllers/projectController")
const middleware = require("../middlewares/index")

const router = express.Router();

router.route("/ngos/:ngoId/project")
.get(projectController.getProjectsByNgoId);

router.route("/ngo/addproject")
.post(middleware.hasToken, projectController.addProject)

router.route("/project/:id")
.get(projectController.getProjectById)

module.exports = router;