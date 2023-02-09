const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const validateAuth = require("../middlewares/validateAuth");
const validateAdminPermition = require("../middlewares/validateAdminPermition");
const validateRequestMiddleware = require("../middlewares/validateUsersRequest");

const controller = new UsersController;

const usersRouters = Router();

usersRouters.post("/", [validateAuth, validateRequestMiddleware, validateAdminPermition], controller.create);
usersRouters.post("/reset_password/:id", validateRequestMiddleware, controller.resetPassword);
usersRouters.get("/", validateAuth, controller.index);
usersRouters.delete("/:id", [validateAuth, validateAdminPermition], controller.delete);
usersRouters.put("/update/:id", [validateAuth, validateRequestMiddleware], controller.updateUser);

module.exports = usersRouters;
