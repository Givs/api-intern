const usersSchemas = {
    type: 'object',
    properties: {
        currentPassword: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        },
        newPassword: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        }
    },
    required: ['currentPassword', 'newPassword'],
    additionalProperties: false,
};

const updateUserSchema = {
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
        }
    },
    required: ['name', 'email'],
    additionalProperties: false,
};

const loginSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        },
    },
    required: ['email', 'password'],
    additionalProperties: false,
};

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
            default: false,
        }
    },
    required: ['name', 'email', 'password', 'isAdmin'],
    additionalProperties: false,
};

module.exports = {resetPasswordSchema: usersSchemas, updateUserSchema, loginSchema, userSchema};
