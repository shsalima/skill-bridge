import { body } from "express-validator";

export const registerValidator = [
  body("nom")
    .if((value, { req }) => req.body.role === "Candidat" || !req.body.role)
    .notEmpty()
    .withMessage("Le nom est obligatoire"),
  body("prenom")
    .if((value, { req }) => req.body.role === "Candidat" || !req.body.role)
    .notEmpty()
    .withMessage("Le prénom est obligatoire"),
  body("nomEntreprise")
    .if((value, { req }) => req.body.role === "AdministrateurEntreprise")
    .notEmpty()
    .withMessage("Le nom de l'entreprise est obligatoire"),
  body("email")
    .notEmpty()
    .withMessage("L'adresse e-mail est obligatoire")
    .isEmail()
    .withMessage("L'adresse e-mail est invalide"),
  body("motDePasse")
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("telephone")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Le numéro de téléphone est invalide"),
  body("role")
    .optional()
    .isIn(["Candidat", "AdministrateurEntreprise", "Administrateur"])
    .withMessage("Le rôle est invalide"),
  body("dateNaissance")
    .optional()
    .isISO8601()
    .withMessage("La date de naissance est invalide"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("L'adresse e-mail est obligatoire")
    .isEmail()
    .withMessage(" mettez une adresse email valide"),
  body("motDePasse").notEmpty().withMessage("Mot de passe requis"),
];
