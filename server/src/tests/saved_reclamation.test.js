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
    nom: "Candidat2",
    prenom: "Test2",
    email: "candidat2@test.com",
    motDePasse: "123456789",
    role: "Candidat",
  });
  const resCand = await request(app).post("/api/users/login").send({
    email: "candidat2@test.com",
    motDePasse: "123456789",
  });
  candidatToken = resCand.body.data.token;

  await request(app).post("/api/users/register").send({
    nom: "Company2",
    prenom: "HR2",
    email: "hr2@company.com",
    motDePasse: "123456789",
    role: "Entreprise",
  });
  const resEnt = await request(app).post("/api/users/login").send({
    email: "hr2@company.com",
    motDePasse: "123456789",
  });
  entrepriseToken = resEnt.body.data.token;

  
  const jobRes = await request(app)
    .post("/api/jobs")
    .set("Authorization", `Bearer ${entrepriseToken}`)
    .send({
      titre: "Développeur React Native",
      description: "Poste mobile MERN",
      typeContrat: "CDI",
      domaine: "Informatique",
      ville: "Rabat",
      dateLimite: "2026-12-31",
      competencesRequises: ["React Native", "Node.js"],
    });
  jobId = jobRes.body.data._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Additional Features & Reclamation Module Tests", () => {
  it("1. Soumettre une réclamation par un candidat", async () => {
    const res = await request(app)
      .post("/api/reclamation")
      .set("Authorization", `Bearer ${candidatToken}`)
      .send({
        jobId: jobId,
        motif: "Contenu inapproprié",
        description: "L'offre d'emploi contient des informations ambiguës.",
      });

    expect([200, 201]).toContain(res.statusCode);
  });

  it("2. Empêcher la postulation multiple à la même offre d'emploi", async () => {
    await request(app)
      .post(`/api/applications/apply/${jobId}`)
      .set("Authorization", `Bearer ${candidatToken}`)
      .send({
        cv: "https://example.com/my-cv.pdf",
        lettreMotivation: "Première candidature.",
      });

    const res2 = await request(app)
      .post(`/api/applications/apply/${jobId}`)
      .set("Authorization", `Bearer ${candidatToken}`)
      .send({
        cv: "https://example.com/my-cv.pdf",
        lettreMotivation: "Deuxième candidature.",
      });

    expect(res2.statusCode).toBeGreaterThanOrEqual(400);
  });
});