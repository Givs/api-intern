const path = require('path');
const { Validator } = require('jsonschema');
const validator = new Validator();

const AppError = require("../utils/AppError");

const { resetPasswordSchema, updateUserSchema, userSchema} = require("../schemas/users/usersSchemas");

const validateRequest = schema => (req, res, next) => {
    const { errors } = validator.validate(req.body, schema);

    if (errors.length) {
        throw new AppError(errors[0].message, 401);
    }

    next();

};

const schemas = {
    "/reset_password": resetPasswordSchema,
    "/update": updateUserSchema,
    "/": userSchema,
};

const validateRequestMiddleware = (req, res, next) => {
    const basePath = path.dirname(req.path);
    const schema = schemas[basePath];

    if (schema) {
        validateRequest(schema)(req, res, next);
    } else {
        next();
    }
}

module.exports = validateRequestMiddleware;
