import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { createReclamation, getAllReclamation, updateReclamationStatus } from "../controllers/reclamation.controller.js"
import { authorizationCheck } from "../middleware/authorization.middleware.js"

const router=express.Router()

router.post("/",authentificationCheck,createReclamation)

router.get("/",authentificationCheck, authorizationCheck("Administrateur"),getAllReclamation)

router.patch("/:id/status",authentificationCheck, authorizationCheck("Administrateur"),updateReclamationStatus)

export default router