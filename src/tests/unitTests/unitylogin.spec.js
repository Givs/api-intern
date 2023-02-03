const jwt = require('jsonwebtoken');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const authConfig = {
    jwt: {
        secret: 'secret',
        expiresIn: '1d'
    }
};

describe('create', () => {

}
