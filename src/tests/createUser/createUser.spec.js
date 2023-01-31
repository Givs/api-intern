const request = require("supertest");

const BASE_URL ='http://localhost:3000';
const EMAIL = 'admin@admin.com';
const PASSWORD = '123456789';

describe("Test the /users endpoint structure", () => {

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


describe("Test the create user login", () => {
    test("It should create a new user after login and have admin permition", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: EMAIL,
                password: PASSWORD
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");

        const { token } = response.body;
        const createUser = await request(BASE_URL)
            .post("/users")
            .set("authorization", `${token}`)
            .send({
                "name": "admin",
                "email": "normal@normal.com",
                "password": "123456789",
                "isAdmin": false
            });
        expect(createUser.statusCode).toBe(200);
    });

    test("It shouldn't create a new user after login and have NO admin permition", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: "normal@normal.com",
                password: "123456789"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");

        const { token } = response.body;
        const createUser = await request(BASE_URL)
            .post("/users")
            .set("authorization", `${token}`)
            .send({
                "name": "admin",
                "email": "admin4@email.com",
                "password": "123456789",
                "isAdmin": false
            });
        expect(createUser.statusCode).toBe(401);
    });

})
