import express from "express"
import { getProfile, login, register, updateProfile } from "../controllers/user.controller.js"
import { loginValidator, registerValidator } from "../validators/authValidator.js"
import { validate } from "../middleware/validate.js"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { preventRoleUpdate } from "../middleware/preventRoleUpdate.middleware.js"

const router= express.Router()

router.post("/register",registerValidator,validate,register)
router.post("/login",loginValidator,validate,login)

router.get("/profile",authentificationCheck,getProfile)
router.put("/profile",authentificationCheck,preventRoleUpdate,updateProfile)

export default router 