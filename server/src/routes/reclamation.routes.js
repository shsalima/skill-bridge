import express from "express"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { createReclamation } from "../controllers/reclamation.controller.js"

const router=express.Router()

router.post("/",authentificationCheck,createReclamation)

export default router