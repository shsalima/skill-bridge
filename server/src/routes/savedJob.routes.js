import express from "express";
import { toggleSaveJob, getMySavedJobs } from "../controllers/savedJob.controller.js";
import { authentificationCheck } from "../middleware/authentication.middleware.js";
import { authorizationCheck } from "../middleware/authorization.middleware.js";

const router = express.Router();

router.post("/toggle", authentificationCheck, authorizationCheck("Candidat"), toggleSaveJob);

router.get("/my-saved", authentificationCheck, authorizationCheck("Candidat"), getMySavedJobs);

export default router;