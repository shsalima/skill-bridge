import express from "express";
import { authentificationCheck } from "../middleware/authentication.middleware.js";
import { createJobValidator, toggleJobStatusValidator } from "../validators/jobValidator.js";
import { validate } from "../middleware/validate.js";
import { createJob, deleteJob, getAllJobs, getJobById, toggleJobStatus, updateJob } from "../controllers/job.controller.js";
import { authorizationCheck } from "../middleware/authorization.middleware.js";
import { checkJobOwnership } from "../middleware/checkJobOwnership.middleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id",getJobById)

router.post(
  "/",
  authentificationCheck,
  authorizationCheck("AdministrateurEntreprise"),
  createJobValidator,
  validate,
  createJob,
);

router.put("/:id",authentificationCheck,authorizationCheck("AdministrateurEntreprise"),checkJobOwnership,updateJob)

router.delete("/:id",authentificationCheck,authorizationCheck("AdministrateurEntreprise", "Administrateur"),checkJobOwnership,deleteJob)

router.patch("/:id/status",authentificationCheck,authorizationCheck("AdministrateurEntreprise"),checkJobOwnership,toggleJobStatusValidator,validate,toggleJobStatus)


export default router;
