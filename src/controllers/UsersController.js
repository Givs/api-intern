const DatabaseRepository = require("../repositories/DatabaseRepository");
const UserCreateService = require("../services/UserCreateService");
const AppError = require("../utils/AppError");
const CryptInfo = require("../utils/CryptInfo");

const { comparePassword,  hashPassword} = new CryptInfo();
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
        const { id } = req.params;

        try{
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

    async resetPassword(req, res) {
        const { currentPassword, newPassword } = req.body;
        const { id } = req.params;

        try {
            //check if user exists
            const user = await databaseRepository.getUserByParameter('id', id);
            if (!user) throw new AppError('User not found', 401);

            //check if currentPassoword match
            const passwordMatch = await comparePassword(currentPassword, user.password);
            if (!passwordMatch) throw new AppError('Password doesn\'t match', 401);

            const hashedNewPassword = await hashPassword(newPassword);

            //update password
            await databaseRepository.updatePassword(id, hashedNewPassword);
            return res.status(200).send({ message: 'Password updated successfully' });

        } catch (error) {
            throw error.message && error.statusCode
                ? new AppError(error.message, error.statusCode)
                : new AppError('Something went wrong', 500);
        }
    }

    async updateUser(req, res) {
        const { name, email } = req.body;
        const { id } = req.params;

        try {
            //check if user exists
            const user = await databaseRepository.getUserByParameter('id', id);
            if (!user) throw new AppError('User not found', 401);

            await databaseRepository.updateUser(id, name, email);
            return res.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            throw error.message && error.statusCode
                ? new AppError(error.message, error.statusCode)
                : new AppError('Something went wrong', 500);
        }
    }
}

module.exports = UsersController;
