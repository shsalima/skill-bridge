import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret_key_123";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth Module Tests", () => {
  const testUser = {
    nom: "Benani",
    prenom: "Sara",
    email: "sara@example.com",
    motDePasse: "123456789",
    role: "Candidat",
  };

  it("1. Nouveau compte créé avec succès", async () => {
    const res = await request(app).post("/api/users/register").send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
  });

  it("2. Empêcher la création d'un compte avec la même adresse e-mail", async () => {
    const res = await request(app).post("/api/users/register").send(testUser);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("3. Connectez-vous et obtenez un jeton", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: testUser.email,
      motDePasse: testUser.motDePasse,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("token");
  });
});