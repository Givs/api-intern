const CreateUsersRepository = require("../repositories/createUsersRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
    async create(req, res) {
        const { name, email, password, isAdmin } = req.body;

        const createUsersRepository = new CreateUsersRepository();
        const userCreateService = new UserCreateService(createUsersRepository);

        await userCreateService.execute({ name, email, password, isAdmin })
        return res.status(201).json();

    }
}

module.exports = UsersController;
