const request = require("supertest");
const app = require("../server");

describe("Test the /user endpoint", () => {
    test("It should create a new user", async () => {
        const response = await request('http://localhost:3000')
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "123154231"
            });
        expect(response.statusCode).toBe(200);
    });
});
