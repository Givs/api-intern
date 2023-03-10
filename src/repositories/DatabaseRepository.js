const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config['development']);

class DatabaseRepository {
    async getUserByParameter(parameter, value) {
        return db('users').where({ [parameter]: value }).first();
    }

    async createUser(user) {
        return db('users').insert(user);
    }

    async listUsers() {
        return db.select().from('users');
    }

    async deleteUser(id) {
        return db('users').where({ id }).del();
    }

    async updatePassword(id, newPassword) {
        return db('users').where({ id }).update({ password: newPassword });
    }

    async updateUser(id, name, email) {
        return db('users').where({ id }).update({ name, email })
    }
}

module.exports = DatabaseRepository;
