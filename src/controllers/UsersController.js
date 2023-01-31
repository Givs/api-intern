const AppError = require("../utils/AppError");

class UsersController {
    async create(req, res) {
        const info = req.body;
        return res.send(info);
    }
}

module.exports = UsersController;
