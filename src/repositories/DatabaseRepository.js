const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config['development']);

class DatabaseRepository {
    async getUserByParameter(email) {
        return db('users').where({email}).first();
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
}

module.exports = DatabaseRepository;
