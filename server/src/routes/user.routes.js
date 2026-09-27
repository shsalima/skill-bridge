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

/**
 * @swagger
 * /api/users/auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 token: { type: string }
 *                 user: { $ref: '#/components/schemas/User' }
 *       400: { description: Validation error }
 *       401: { description: Invalid email or password }
 */

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