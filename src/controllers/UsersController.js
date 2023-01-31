const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config['development']);

class UsersController {
    async create(req, res) {
        const { name, email, password, isAdmin } = req.body

        const emailExists = await db('users').where({ email }).first();
        if (emailExists) {
            throw new AppError('Email already exists', 400);
        }

        const hashedPassword = await hash(password, 8);

        try {
            await db('users').insert({ name, email, password: hashedPassword, isAdmin });
            return res.status(200).send({ message: 'User created successfully' });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }

    }
}

module.exports = UsersController;
