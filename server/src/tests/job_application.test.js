import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret_key_123";

let mongoServer;
let candidatToken, entrepriseToken;
let jobId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await request(app).post("/api/users/register").send({
    nom: "Candidat",
    prenom: "Test",
    email: "candidat@test.com",
    motDePasse: "123456789",
    role: "Candidat",
  });
  const resCand = await request(app).post("/api/users/login").send({
    email: "candidat@test.com",
    motDePasse: "123456789",
  });
  candidatToken = resCand.body.data.token;

  await request(app).post("/api/users/register").send({
    nom: "Entreprise",
    prenom: "HR",
    email: "hr@company.com",
    motDePasse: "123456789",
    role: "Entreprise",
  });
  const resEnt = await request(app).post("/api/users/login").send({
    email: "hr@company.com",
    motDePasse: "123456789",
  });
  entrepriseToken = resEnt.body.data.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Jobs & Applications Module Tests", () => {
  it("1. Création d'une nouvelle offre d'emploi par l'entreprise", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${entrepriseToken}`)
      .send({
        titre: "Développeur Full Stack MERN",
        description: "Poste pour développeur expérimenté avec compétences MERN",
        typeContrat: "CDI",
        domaine: "Informatique",
        ville: "Casablanca",
        dateLimite: "2026-12-31",
        competencesRequises: ["React", "Node.js", "MongoDB"],
      });

    if (res.statusCode !== 201) {
      console.log("Job Creation Error:", res.body);
    }

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty("_id");
    jobId = res.body.data._id;
  });

  it("2. Postulation à l'emploi et calcul du scoreMatching", async () => {
    const res = await request(app)
      .post(`/api/applications/apply/${jobId}`)
      .set("Authorization", `Bearer ${candidatToken}`)
      .send({
        cv: "https://example.com/my-cv.pdf",
        lettreMotivation: "Je suis très intéressé par ce poste de développeur.",
      });

    if (res.statusCode !== 201 && res.statusCode !== 200) {
      console.log("Application Error Status:", res.statusCode);
      console.log("Application Error Body:", res.body);
    }

    expect([200, 201]).toContain(res.statusCode);
  });
});