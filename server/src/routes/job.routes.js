import express from "express";
import { authentificationCheck } from "../middleware/authentication.middleware.js";
import { createJobValidator } from "../validators/jobValidator.js";
import { validate } from "../middleware/validate.js";
import { createJob } from "../controllers/job.controller.js";
import { authorizationCheck } from "../middleware/authorization.middleware.js";

const router = express.Router();


router.post("/",authentificationCheck,authorizationCheck("Entreprise"),createJobValidator,validate,createJob);
export default router;
