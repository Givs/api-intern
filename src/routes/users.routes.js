const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const validateRequest = require("../middlewares/validateUserPostRequest");
const validateAuth = require("../middlewares/validateAuth");
const validateAdminPermition = require("../middlewares/validateAdminPermition");

const controller = new UsersController;

const usersRouters = Router();

usersRouters.post("/", [validateAuth, validateRequest, validateAdminPermition], controller.create);
usersRouters.get("/", validateAuth, controller.index);
usersRouters.delete("/:id", [validateAuth, validateAdminPermition], controller.delete);

module.exports = usersRouters;
