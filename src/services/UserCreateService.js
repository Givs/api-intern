const AppError = require("../utils/AppError");
const CryptInfo = require("../utils/CryptInfo");

const { hashPassword } = new CryptInfo();

class UserCreateService {

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ name, email, password, isAdmin }) {
        try {
            //check if email exists in database
            const emailExists = await this.userRepository.getUserByParameter('email', email);
            if (emailExists) {
                throw new AppError('Email already exists', 400);
            }

            const hashedPassword = await hashPassword(password);

            //create user object
            const user = { name, email, password: hashedPassword, isAdmin };

            //add user to database
            return await this.userRepository.createUser(user);
        } catch (error) {
            throw error.message && error.statusCode
                ? new AppError(error.message, error.statusCode)
                : new AppError('Something went wrong', 500);
        }
    }
}

module.exports = UserCreateService;
