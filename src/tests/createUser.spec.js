const request = require("supertest");
const BASE_URL ='http://localhost:3000';

describe("Test the /users endpoint post", () => {
    test("It should create a new user with admin permition true", async () => {
        const response = await request('http://localhost:3000')
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "123154231",
                isAdmin: true
            });
        expect(response.statusCode).toBe(200);
    });

    test("It should create a new user with admin permition false", async () => {
        const response = await request(BASE_URL)
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe2@example.com",
                password: "123154231",
                isAdmin: false
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't create a new user without pass name key in request", async () => {
        const response = await request(BASE_URL)
            .post("/users")
            .send({
                email: "johndoe@example.com",
                password: "123154231",
                isAdmin: true
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't create a new user without pass email key in request", async () => {
        const response = await request(BASE_URL)
            .post("/users")
            .send({
                name: "John Doe",
                password: "123154231",
                isAdmin: true
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't create a new user without pass password key in request", async () => {
        const response = await request(BASE_URL)
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                isAdmin: true
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't create a new user without pass admin key in request", async () => {
        const response = await request(BASE_URL)
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "123154231",
            });
        expect(response.statusCode).toBe(401);
    });
});
