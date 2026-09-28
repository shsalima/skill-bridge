import express from "express";
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
} from "../controllers/user.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";
import { authentificationCheck } from "../middleware/authentication.middleware.js";
import { authorizationCheck } from "../middleware/authorization.middleware.js";
import { preventRoleUpdate } from "../middleware/preventRoleUpdate.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, motDePasse]
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
 *                  success: { type: boolean }
 *                  message: { type: string }
 *                  data:
 *                    type: object
 *                    properties:
 *                      utilisateur:
 *                        type: object
 *                        properties:
 *                          id: { type: string , example: 64a1f2e5c3b9a2b1d4e5f6g7 }
 *                          prenom: { type: string , example: salima }
 *                          nom: { type: string , example: sahi }
 *                          telephone: { type: string , example: 1234567890 }
 *                          email: { type: string , example: salima.sahi@example.com }
 *                          role: { type: string , example: Candidat }
 *                          photo: { type: string , example: https://example.com/photo.jpg }
 *                      token: { type: string , example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTFmMmU1YzNiOWEyYjFkNGU1ZjZnNyIsInJvbGUiOiJDYW5kaWRhdCIsImlhdCI6MTY4OTQ3MjAwMCwiZXhwIjoxNjg5NTU4NDAwfQ.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890abc123 }
 *
 *
 *       400: { description: Validation error }
 *       401: { description: Invalid email or password }
 */

router.post("/login", loginValidator, validate, login);

router.get("/profile", authentificationCheck, getProfile);
router.put("/profile", authentificationCheck, preventRoleUpdate, updateProfile);

router.post("/logout", authentificationCheck, logout);

router.get(
  "/",
  authentificationCheck,
  authorizationCheck("Administrateur"),
  getAllUsers,
);
router.delete(
  "/:id",
  authentificationCheck,
  authorizationCheck("Administrateur"),
  deleteUser,
);
router.get(
  "/companies/all",
  authentificationCheck,
  authorizationCheck("Administrateur"),
  getAllCompanies,
);
router.patch(
  "/companies/:id/block",
  authentificationCheck,
  authorizationCheck("Administrateur"),
  toggleBlockCompany,
);

export default router;
