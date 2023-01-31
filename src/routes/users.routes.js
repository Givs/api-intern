const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const validateRequest = require("../middlewares/validateUserPostRequest");

const controller = new UsersController;

const usersRouters = Router();
usersRouters.post("/", validateRequest, controller.create);

module.exports = usersRouters;
