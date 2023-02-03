const knex = require('knex');
const config = require('../../knexfile');
const db = knex(config['development']);

class DatabaseRepository {
    async checkIfEmailExists(email) {
        return db('users').where({email}).first();
    }

    async createUser(user) {
        return db('users').insert(user);
    }
}

module.exports = DatabaseRepository;
