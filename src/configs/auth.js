module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "mysecretkey", //palavra que é usada pra gerar o token
        expiresIn: "1d"
    }
}
