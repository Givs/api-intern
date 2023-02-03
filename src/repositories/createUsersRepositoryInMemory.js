class createUsersRepositoryInMemory {
    users = [];

    async createUser({ name, email, password, isAdmin }) {
        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            email,
            name,
            password,
            isAdmin
        };

        this.users.push(user);
        return user;
    }

    async getUserByParameter(email, value) {
        return this.users.find(user => user.email === value);
    }

}

module.exports = createUsersRepositoryInMemory;
