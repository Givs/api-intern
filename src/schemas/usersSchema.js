const userSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 50
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        },
        isAdmin: {
            type: 'boolean',
            default: false
        }
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false,
};

module.exports = userSchema;
