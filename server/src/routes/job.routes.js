import express from "express";
import { authentificationCheck } from "../middleware/authentication.middleware.js";
import { createJobValidator } from "../validators/jobValidator.js";
import { validate } from "../middleware/validate.js";
import { createJob, getAllJobs, getJobById, updateJob } from "../controllers/job.controller.js";
import { authorizationCheck } from "../middleware/authorization.middleware.js";
import { checkJobOwnership } from "../middleware/checkJobOwnership.middleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id",getJobById)

router.post(
  "/",
  authentificationCheck,
  authorizationCheck("Entreprise"),
  createJobValidator,
  validate,
  createJob,
);

router.put("/:id",authentificationCheck,authorizationCheck("Entreprise"),checkJobOwnership,updateJob)
export default router;
