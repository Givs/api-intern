const DatabaseRepository = require("../repositories/DatabaseRepository");
const UserCreateService = require("../services/UserCreateService");
const AppError = require("../utils/AppError");

const databaseRepository = new DatabaseRepository();
const userCreateService = new UserCreateService(databaseRepository);

class UsersController {
    async create(req, res) {
        const { name, email, password, isAdmin } = req.body;

        await userCreateService.execute({ name, email, password, isAdmin })
        return res.status(201).json({message: 'User created successfully'});

    }

    async index(req, res) {
        try{
            const indexUsers = await databaseRepository.listUsers();
            return res.status(200).send(indexUsers);
        } catch (error) {
            throw new AppError('Failed to retrieve users', 500);
        }

    }

    async delete(req, res){
        try{
            const { id } = req.params;

            //knex return 0 in case that none users was deleted
            const rowsAffected = await databaseRepository.deleteUser(id);
            if (!rowsAffected) throw new AppError('User not found', 404);

            return res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            throw error.message && error.statusCode
                ? new AppError(error.message, error.statusCode)
                : new AppError('Something went wrong', 500);
        }
    }
}

module.exports = UsersController;
