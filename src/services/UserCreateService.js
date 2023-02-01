const AppError = require("../utils/AppError");
const { hashPassword } = require("../utils/passwordCrypt");

class UserCreateService {

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ name, email, password, isAdmin }) {

        //check if email exists in database
        const emailExists = await this.userRepository.checkIfEmailExists(email);
        if (emailExists) {
            throw new AppError('Email already exists', 400);
        }

        const hashedPassword = await hashPassword(password);


        //add user on database
        try {
            const user = { name, email, password: hashedPassword, isAdmin };
            return await this.userRepository.createUser(user);
        } catch (error) {
            throw new AppError('Something wrong', 500);
        }
    }
}

module.exports = UserCreateService;
