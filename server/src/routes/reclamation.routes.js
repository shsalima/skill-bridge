import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { createReclamation, getAllReclamation } from "../controllers/reclamation.controller.js"
import { authorizationCheck } from "../middleware/authorization.middleware.js"

const router=express.Router()

router.post("/",authentificationCheck,createReclamation)

router.get("/",authentificationCheck, authorizationCheck("Administrateur"),getAllReclamation)

export default router