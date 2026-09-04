import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { authorizationCheck } from "../middleware/authorization.middleware.js"
import { checkJobIsAvailable } from "../middleware/checkJobIsAvailable.js"
import { applyToJob } from "../controllers/application.controller.js"


const router=express.Router()

router.post("/apply/:jobId",authentificationCheck,authorizationCheck("Candidat"),checkJobIsAvailable,applyToJob)

export default router