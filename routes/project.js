const express = require("express")
const projectController = require("../controllers/projectController")
const middleware = require("../middlewares/index")

const router = express.Router();

router.route("/ngos/:ngoId/project")
.post(middleware.hasToken, projectController.addProject)
.get(projectController.getProjectsByNgoId);

router.route("/project/:id")
.get(projectController.getProjectById)

module.exports = router;