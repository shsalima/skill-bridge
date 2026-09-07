import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { authorizationCheck } from "../middleware/authorization.middleware.js"
import { getEntrepriseStats } from "../controllers/dashboard.controller.js"


const router = express.Router()

router.get("/entreprise",authentificationCheck,authorizationCheck("Entreprise"),getEntrepriseStats)

export default router