exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('isAdmin').defaultTo(false).notNullable();
    })
        .then(() => {
            return knex("users").insert({
                id: 1,
                name: 'Admin',
                email: 'admin@admin.com',
                password: '123456789',
                isAdmin: true
            })
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
