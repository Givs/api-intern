const AppError = require("../utils/AppError");

const validateAdminPermition = (req, res, next) => {
    const { isAdmin } = req.user;

    if (!isAdmin) throw new AppError('You can\'t acess this method', 401);

    next();
}

module.exports = validateAdminPermition;
