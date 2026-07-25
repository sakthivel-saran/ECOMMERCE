const request = require("supertest");
const app = require("../app");

describe("GET /api/v1/...", () => {
    it("it should return 200", async () => {
        const res = await request(app).get("/api/v1/...");

        expect(res.statusCode).toBe(200);
       
    })
    it("it should return object  and task proprty ok ", async () => {
        const res = await request(app).get("/api/v1/...");
        expect(typeof (res.body)).toBe("object");
        expect(res.body).toHaveProperty([]);
    })
});