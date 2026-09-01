import express from "express"
import { getProfile, login, register } from "../controllers/user.controller.js"
import { loginValidator, registerValidator } from "../validators/authValidator.js"
import { validate } from "../middleware/validate.js"
import { authentificationCheck } from "../middleware/authentication.middleware.js"

const router= express.Router()

router.post("/register",registerValidator,validate,register)
router.post("/login",loginValidator,validate,login)

router.get("/profile",authentificationCheck,getProfile)

export default router 