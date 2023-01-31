const { Router } = require("express");

const usersRouters = require("./users.routes");
const sessionsRouters = require("./sessions.routes");

const routes = Router();

routes.use('/users', usersRouters);
routes.use('/sessions', sessionsRouters);

module.exports = routes
