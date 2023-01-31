const { verify } = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    //check if there is no token
    if (!authHeader) {
        throw new AppError('No token provided', 401)
    }

    //check if is valid token
    const { secret } = authConfig.jwt
    verify(authHeader, secret, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Token is not valid"
            });
        }

        // add the decoded information to the request
        req.user = decoded;

        next();
    });
}

module.exports = verifyToken;
