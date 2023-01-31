const { hash } = require("bcryptjs");
const PASSWORD = '123456789'

const hashedPassword  = async () => await hash(PASSWORD, 8);

exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('isAdmin').defaultTo(false).notNullable();
    });
    await knex("users").insert({
        id: 1,
        name: 'Admin',
        email: 'admin@admin.com',
        password: await hashedPassword(),
        isAdmin: true
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
