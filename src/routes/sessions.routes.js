const { Router } = require("express");

const SessionController = require("../controllers/SessionController");
const sessionController = new SessionController;

const validateRequest = require("../middlewares/validateLoginRequest");

const sessionsRoutes = Router();

sessionsRoutes.post("/", validateRequest, sessionController.create);

module.exports = sessionsRoutes;
