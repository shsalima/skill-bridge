import { body } from "express-validator";


export const registerValidator=[
    body("nom")
        .notEmpty()
        .withMessage("Le nom est obligatoire"),
    body("prenom")
        .notEmpty()
        .withMessage("Le prénom est obligatoire"),
    body("email")
        .notEmpty()
        .withMessage("L'adresse e-mail est obligatoire")
        .isEmail()
        .withMessage("L'adresse e-mail est invalide"),
        body("motDePasse")
        .notEmpty()
        .withMessage("Le mot de passe est obligatoire")
        .isLength({min:6})
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
        body("telephone")
        .optional()
        .isMobilePhone()
        .withMessage("Le numéro de téléphone est invalide"),
        body("role")
        .optional()
        .isIn(["Candidat", "Entreprise", "Administrateur"])
        .withMessage("Le rôle est invalide"),
        body("dateNaissance")
        .optional()
        .isISO8601()
        .withMessage("La date de naissance est invalide"),
        
        
    ]
    
    
    export const loginValidator =[
        body("email")
        .notEmpty()
        .withMessage("L'adresse e-mail est obligatoire")
        .isEmail()
        .withMessage(" mettez une adresse email valide"),
       body("motDePasse")
        .notEmpty()
        .withMessage("Mot de passe requis")
]