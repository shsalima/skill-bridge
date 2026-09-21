import express from "express"
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
  getAllUsers,
  deleteUser,
  getAllCompanies,
  toggleBlockCompany,
} from "../controllers/user.controller.js"
import { loginValidator, registerValidator } from "../validators/authValidator.js"
import { validate } from "../middleware/validate.js"
import { authentificationCheck } from "../middleware/authentication.middleware.js"
import { authorizationCheck } from "../middleware/authorization.middleware.js"
import { preventRoleUpdate } from "../middleware/preventRoleUpdate.middleware.js"

const router= express.Router()

router.post("/register",registerValidator,validate,register)
router.post("/login",loginValidator,validate,login)

router.get("/profile",authentificationCheck,getProfile)
router.put("/profile",authentificationCheck,preventRoleUpdate,updateProfile)

router.post("/logout", authentificationCheck, logout);

// Admin user & company routes
router.get("/", authentificationCheck, authorizationCheck("Administrateur"), getAllUsers);
router.delete("/:id", authentificationCheck, authorizationCheck("Administrateur"), deleteUser);
router.get("/companies/all", authentificationCheck, authorizationCheck("Administrateur"), getAllCompanies);
router.patch("/companies/:id/block", authentificationCheck, authorizationCheck("Administrateur"), toggleBlockCompany);

export default router 