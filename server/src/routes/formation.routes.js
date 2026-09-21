import express from "express";
import { authentificationCheck } from "../middleware/authentication.middleware.js";
import { addFormation, deleteFormation, getMyFormations } from "../controllers/formation.controller.js";
import { authorizationCheck } from "../middleware/authorization.middleware.js";



const router = express.Router();

router.post("/",authentificationCheck,authorizationCheck("Candidat"),addFormation)

router.get("/my-formations",authentificationCheck,authorizationCheck("Candidat"),getMyFormations)

router.delete("/:id",authentificationCheck,authorizationCheck("Candidat"),deleteFormation)



export default router