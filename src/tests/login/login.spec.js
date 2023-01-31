const request = require("supertest");

const BASE_URL ='http://localhost:3000';
const EMAIL = 'admin@admin.com';
const PASSWORD = '123456789';

describe("Test the /session endpoint structure", () => {

    test("It shouldn't login without pass email", async () => {
      const response = await request(BASE_URL)
          .post("/sessions")
          .send({
              //email: "johndoe@example.com",
              password: "123154231"
      });
      expect(response.statusCode).toBe(401);
    });

    test("It shouldn't login without pass password", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: "johndoe@example.com",
                //password: "123154231"
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't login if pass wrong type for email", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: 1,
                password: "123154231"
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't login if pass invalid email", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: "johndoe__example&com",
                password: 1
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't login if pass wrong type for password", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: "johndoe@example.com",
                password: 1
            });
        expect(response.statusCode).toBe(401);
    });

});

describe("Test the login logic", () => {
    test("It should login if pass email and password correct", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: EMAIL,
                password: PASSWORD
        });
        expect(response.statusCode).toBe(200);
    });

    test("It shouldn't login if pass email that doesn't exist on database", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: "dnaskjdadfsfdsfsdafla@email.com",
                password: PASSWORD
            });
        expect(response.statusCode).toBe(400);
    });

    test("It shouldn't login if pass correct email but wrong password", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: EMAIL,
                password: "dnasjndalfadsfasdfdsl121d5"
            });
        expect(response.statusCode).toBe(401);
    });

    test("It shouldn't login if pass correct password but wrong email", async () => {
        const response = await request(BASE_URL)
            .post("/sessions")
            .send({
                email: "fjdhasjkfadksjhfkjds@admin.com",
                password: PASSWORD
            });
        expect(response.statusCode).toBe(400);
    });

});
