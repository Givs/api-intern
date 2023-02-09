const { Validator } = require('jsonschema');
const validator = new Validator();

const AppError = require("../utils/AppError");
const loginSchema = require("../schemas/session/loginSchema");

const validateLoginRequest = (req, res, next) => {
    const { errors } = validator.validate(req.body, loginSchema);

    if (errors.length) {
        throw new AppError(errors[0].message, 401);
    }

    next();
}

module.exports = validateLoginRequest;
