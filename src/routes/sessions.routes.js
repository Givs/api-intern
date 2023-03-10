const { Router } = require("express");

const SessionController = require("../controllers/SessionController");
const sessionController = new SessionController;

const validateLoginRequest = require("../middlewares/validateLoginRequest");

const sessionsRoutes = Router();

sessionsRoutes.post("/", validateLoginRequest, sessionController.create);

module.exports = sessionsRoutes;
