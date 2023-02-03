const bcrypt = require('bcryptjs');

class CryptInfo {
    async hashPassword(password){
        return await bcrypt.hash(password, 8);
    }

    async comparePassword(inputPassoword, databasePassoword){
        return await bcrypt.compare(inputPassoword, databasePassoword);
    }
}

module.exports = CryptInfo;

