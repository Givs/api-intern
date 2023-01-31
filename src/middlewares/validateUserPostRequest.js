const { Validator } = require('jsonschema');
const validator = new Validator();

const AppError = require("../utils/AppError");
const userSchema = require("../schemas/usersSchema");

const validateUserPostRequest = (req, res, next) => {
    const { errors } = validator.validate(req.body, userSchema);
    const { isAdmin } = req.user;

    if (errors.length){
        throw new AppError(errors[0].message, 401);
    }

    //verify if user is Admin
    if (!isAdmin){
        throw new AppError('You can\'t acess this method', 401);
    }

    next();
};

module.exports = validateUserPostRequest;
