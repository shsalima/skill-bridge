import { body } from "express-validator";


export const createJobValidator=[
    body("titre")
        .notEmpty()
        .withMessage("Titre de l'offre requis"),
    body("description")
        .notEmpty()
        .withMessage("Une description de l'offre est requise."),
    body("typeContrat")
        .isIn(["CDI", "CDD", "Stage", "Freelance"])
        .withMessage("Le type de contrat est invalide."),
    body("domaine")
        .notEmpty()
        .withMessage("Domaine d'emploi obligatoire"),
    body("ville")
        .notEmpty()
        .withMessage("La ville est en demande"),
    body("competencesRequises")
        .isArray({min:1})
        .withMessage("Au moins deux compétences doivent être incluses"),
    body("dateLimite")
        .isISO8601()
        .withMessage("Date d'expiration de l'offre non valable")
    
    
]