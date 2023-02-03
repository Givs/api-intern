const authConfig = require("../configs/auth");
const CryptInfo = require("../utils/CryptInfo");

const AppError = require("../utils/AppError");
const { sign } = require("jsonwebtoken");

const DatabaseRepository = require("../repositories/DatabaseRepository");


class SessionController {
    async create(req, res) {
        try {
            const { email, password } = req.body;

            const { getUserByParameter } = new DatabaseRepository();
            const { comparePassword } = new CryptInfo();

            const user = await getUserByParameter('email', email);
            if (!user){
                throw new AppError('Email not found', 400);
            }

            //check if password is correct
            const matchPassword = await comparePassword(password, user.password);
            if (!matchPassword){
                throw new AppError('Wrong password', 400);
            }

            //sign and return token
            const { secret, expiresIn } = authConfig.jwt;
            const payload = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }

            const token = sign(payload, secret, {
                subject: String(user.id),
                expiresIn
            })

            return res.send({ token });
        } catch (error) {
            throw error.message && error.statusCode
                ? new AppError(error.message, error.statusCode)
                : new AppError('Something went wrong', 500);
        }
    }
}

module.exports = SessionController;
