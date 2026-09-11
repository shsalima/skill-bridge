import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret_key_123";

let mongoServer;
let candidatToken, entrepriseToken;
let jobId, applicationId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await request(app).post("/api/users/register").send({
    nom: "Morad",
    prenom: "Alami",
    email: "morad@test.com",
    motDePasse: "123456789",
    role: "Candidat",
  });
  const resCand = await request(app).post("/api/users/login").send({
    email: "morad@test.com",
    motDePasse: "123456789",
  });
  candidatToken = resCand.body.data.token;

  await request(app).post("/api/users/register").send({
    nom: "TechCorp",
    prenom: "Manager",
    email: "manager@techcorp.com",
    motDePasse: "123456789",
    role: "Entreprise",
  });
  const resEnt = await request(app).post("/api/users/login").send({
    email: "manager@techcorp.com",
    motDePasse: "123456789",
  });
  entrepriseToken = resEnt.body.data.token;

  const jobRes = await request(app)
    .post("/api/jobs")
    .set("Authorization", `Bearer ${entrepriseToken}`)
    .send({
      titre: "Développeur Backend Node.js",
      description: "Poste Backend Express / MongoDB",
      typeContrat: "CDI",
      domaine: "Informatique",
      ville: "Rabat",
      dateLimite: "2026-12-31",
      competencesRequises: ["Node.js", "Express", "MongoDB"],
    });
  jobId = jobRes.body.data._id;

  const appRes = await request(app)
    .post(`/api/applications/apply/${jobId}`)
    .set("Authorization", `Bearer ${candidatToken}`)
    .send({
      cv: "https://example.com/cv-morad.pdf",
      lettreMotivation: "Candidature pour le poste Node.js",
    });
  applicationId = appRes.body.data._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Application Management Module Tests", () => {
  it("1. Récupérer les candidatures pour une offre spécifique (Entreprise)", async () => {
    const res = await request(app)
      .get(`/api/applications/job/${jobId}`)
      .set("Authorization", `Bearer ${entrepriseToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it("2. Consulter mes propres candidatures (Candidat)", async () => {
    const res = await request(app)
      .get("/api/applications/my-applications")
      .set("Authorization", `Bearer ${candidatToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

it("3. Mettre à jour le statut d'une candidature (Entreprise)", async () => {
    if (!applicationId) {
      const appList = await request(app)
        .get(`/api/applications/job/${jobId}`)
        .set("Authorization", `Bearer ${entrepriseToken}`);
      applicationId = appList.body.data[0]?._id;
    }

    const res = await request(app)
      .patch(`/api/applications/${applicationId}/status`)
      .set("Authorization", `Bearer ${entrepriseToken}`)
      .send({
        statut: "Acceptée",
      });

    if (res.statusCode !== 200 && res.statusCode !== 201) {
      console.log("Update Status Error Body:", res.body);
    }

    expect([200, 201]).toContain(res.statusCode);
  });
});