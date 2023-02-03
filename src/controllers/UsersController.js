const DatabaseRepository = require("../repositories/DatabaseRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
    async create(req, res) {
        const { name, email, password, isAdmin } = req.body;

        const databaseRepository = new DatabaseRepository();
        const userCreateService = new UserCreateService(databaseRepository);

        await userCreateService.execute({ name, email, password, isAdmin })
        return res.status(201).json();

    }
}

module.exports = UsersController;
