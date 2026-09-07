import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { authorizationCheck } from "../middleware/authorization.middleware.js"
import { getAdminStats, getEntrepriseStats } from "../controllers/dashboard.controller.js"


const router = express.Router()

router.get("/entreprise",authentificationCheck,authorizationCheck("Entreprise"),getEntrepriseStats)

router.get("/admin",authentificationCheck,authorizationCheck("Administrateur"),getAdminStats)

export default router