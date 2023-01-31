const knex = require("../database/knex");
const authConfig = require("../configs/auth");

const AppError = require("../utils/AppError");

const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        //check if email exists in database
        const user = await knex('users').where({ email }).first();
        if (!user){
            throw new AppError('Email not found', 400);
        }

        //check if password is correct
        const matchPassword = await compare(password, user.password);
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
    }
}

module.exports = SessionController;
