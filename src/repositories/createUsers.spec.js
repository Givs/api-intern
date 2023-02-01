const UserCreateService = require("../services/UserCreateService");
const CreateUsersRepositoryInMemory= require("../repositories/createUsersRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("User create", () => {
    let createUsersRepositoryInMemory = null,
        userCreateService = null;

    beforeEach(() => {
        createUsersRepositoryInMemory = new CreateUsersRepositoryInMemory();
        userCreateService = new UserCreateService(createUsersRepositoryInMemory)
    });

    it("user should be create", async () => {
        const user = {
            name: "User teste",
            email: "user@test.com",
            password: "123",
            isAdmin: true
        }

        const userCreated = await userCreateService.execute(user);
        expect(userCreated).toHaveProperty("id");
    })

    it("user should not be create with exists email", async () => {
        const user1 = {
            name: "User teste",
            email: "user@test.com",
            password: "123",
            isAdmin: true
        }
        const user2 = {
            name: "User teste 2",
            email: "user@test.com",
            password: "123",
            isAdmin: true
        }

        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email already exists"));
    })
})
