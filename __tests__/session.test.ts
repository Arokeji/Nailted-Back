import mongoose from "mongoose";
import { mongoConnect } from "../src/domain/repositories/mongo-repository";
import { app } from "../src/server/index";
import { ISessionCreate } from "../src/domain/entities/session-entity";
import request from "supertest";

describe("Session Controler", () => {
  const sessionMoc: ISessionCreate = {
    email: "adrian.rojas@example.com",
    globalScore: 42,
    categoryScore: [
      {
        category: {
          name: "Finanzas",
          mark: [
            {
              name: "Finanzas",
              min: 1,
              max: 10,
              tip: "Debes mejorar chaval",
            },
          ],
        } as any,
        score: 60,
      },
    ],
    version: 42,
  };

  let emailToken: string;
  let createdSessionId: string = "64b563250719fc3c9e4c54cc";

  beforeAll(async () => {
    await mongoConnect();
  }, 100000);
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("POST /session", async () => {
    const response = await request(app).post("/session").set("Accept", "application/json").send(sessionMoc).expect(201);

    expect(response.body).toHaveProperty("_id");

    createdSessionId = response.body._id;
  });
  it("GET /:id/session", async () => {
    const response = await request(app).get(`/${createdSessionId}/session`);
    expect(response.statusCode).toBe(404);
  });
  it("PUT /session/:id", async () => {
    const response = await request(app).put(`/session/${createdSessionId}`).send(sessionMoc);
    expect(response.statusCode).toBe(400);
  });
  it("GET /session/email/:email", async () => {
    await request(app).get(`/session/email/${createdSessionId}`).expect(404);
    const emailResponse = await request(app).get(`/session/email/${createdSessionId}`).set("Authorization", `Bearer ${emailToken}`);
    expect(emailResponse.statusCode).toBe(404);
  });
  it("POST /:id/send-results", async () => {
    const response = await request(app).post(`/${createdSessionId}/send-results`).set("Accept", "application/json").send(sessionMoc);
    expect(response.statusCode).toBe(404);
  });
});
