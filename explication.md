# 📘 COURS COMPLET — PROJET SKILLBRIDGE (MERN Stack)
> Fichier de révision personnel pour la soutenance de projet.
> Basé exclusivement sur le code réel du projet.

---

## 📋 TABLE DES MATIÈRES

1. [Aperçu & Architecture MERN](#1-aperçu--architecture-mern-de-skillbridge)
2. [Les Dépendances npm](#2-les-dépendances-npm)
3. [Backend — Fichiers de Démarrage](#3-backend--fichiers-de-démarrage)
4. [Backend — Les Modèles Mongoose](#4-backend--les-modèles-mongoose)
5. [Backend — Les Middlewares](#5-backend--les-middlewares)
6. [Backend — Les Services](#6-backend--les-services)
7. [Backend — Les Contrôleurs](#7-backend--les-contrôleurs)
8. [Backend — Les Routes Express](#8-backend--les-routes-express)
9. [Frontend — Point d'Entrée](#9-frontend--point-dentrée)
10. [Frontend — Redux Store & Slices](#10-frontend--redux-store--slices)
11. [Frontend — Axios & Services API](#11-frontend--axios--services-api)
12. [Frontend — Layout & Routing](#12-frontend--layout--routing)
13. [Frontend — Pages par Rôle](#13-frontend--pages-par-rôle)
14. [Workflows Métier Complets](#14-workflows-métier-complets)
15. [Sécurité & JWT](#15-sécurité--jwt)
16. [Gestion des Erreurs](#16-gestion-des-erreurs)
17. [Guide de Soutenance](#17-guide-de-soutenance--questions-fréquentes-du-jury)

---

## 1. Aperçu & Architecture MERN de SkillBridge

### Qu'est-ce que SkillBridge ?
SkillBridge est une **plateforme de mise en relation entre candidats et entreprises**. C'est une application web Full Stack construite avec la stack **MERN** :
- **M** → MongoDB (base de données NoSQL)
- **E** → Express.js (framework serveur Node.js)
- **R** → React.js (interface utilisateur)
- **N** → Node.js (environnement d'exécution JavaScript côté serveur)

### Les 3 Rôles dans le Projet
| Rôle | Valeur en BDD | Ce qu'il peut faire |
|------|--------------|---------------------|
| Candidat | `"Candidat"` | S'inscrire, consulter les offres, postuler, sauvegarder, réclamation |
| Entreprise | `"AdministrateurEntreprise"` | Créer des offres, voir les candidatures, accepter/refuser |
| Admin | `"Administrateur"` | Voir tous les utilisateurs, toutes les offres, modérer réclamations |

### Structure des Dossiers
```
SkillBridge-fin-copie/
├── server/                    ← Backend Node.js / Express
│   ├── src/
│   │   ├── app.js             ← Configuration Express + routes
│   │   ├── server.js          ← Démarrage du serveur
│   │   ├── config/db.js       ← Connexion MongoDB
│   │   ├── models/            ← Schémas Mongoose (structure BDD)
│   │   ├── controllers/       ← Logique métier (traitement requêtes)
│   │   ├── services/          ← Logique réutilisable (accès BDD)
│   │   ├── routes/            ← Définition des endpoints API
│   │   ├── middleware/        ← Fonctions intermédiaires (auth, validation)
│   │   ├── validators/        ← Règles de validation des données
│   │   └── tests/             ← Tests automatisés Jest + Supertest
│   └── package.json
│
└── client/                    ← Frontend React + Redux
    ├── src/
    │   ├── main.jsx           ← Point d'entrée React
    │   ├── App.jsx            ← Composant racine + BrowserRouter
    │   ├── app/               ← Store Redux
    │   ├── features/          ← Slices Redux + Services API
    │   ├── pages/             ← Pages par rôle
    │   ├── components/        ← Layout (Header, Sidebar, ProtectedRoute)
    │   ├── routes/            ← AppRoutes.jsx (toutes les routes React)
    │   └── utils/             ← axiosInstance + formatters
    └── package.json
```

### Schéma de Communication Global
```
[Navigateur]
    |
    |  React + Redux Toolkit
    |  Axios (HTTP)
    |
[Express API  http://localhost:5000/api]
    |
    |  Middleware (JWT, Rôles, Validation)
    |  Controller → Service
    |
[MongoDB Atlas / Local]
    |  Mongoose ODM
    |  Collections: users, jobs, applications, notifications, reclamations, savedjobs
```

---

## 2. Les Dépendances npm

### Backend (`server/package.json`)

| Package | Rôle |
|---------|------|
| `express` | Framework web pour créer l'API REST (routes, middleware, requêtes/réponses HTTP) |
| `mongoose` | ODM (Object Data Modeling) pour MongoDB — définit les schémas et facilite les requêtes |
| `bcryptjs` | Hashage des mots de passe (on ne stocke jamais un mot de passe en clair) |
| `jsonwebtoken` | Génération et vérification des tokens JWT (authentification sans session) |
| `dotenv` | Charge les variables d'environnement depuis le fichier `.env` (MONGO_URL, JWT_SECRET) |
| `cors` | Autorise le frontend (port 5173) à appeler l'API (port 5000) — Cross-Origin |
| `nodemon` | Redémarre automatiquement le serveur à chaque modification de fichier (dev only) |
| `jest` | Framework de tests automatisés |
| `supertest` | Permet de tester les routes Express en simulant des requêtes HTTP |
| `mongodb-memory-server` | Lance une vraie instance MongoDB en RAM pour les tests (isolation totale) |

### Frontend (`client/package.json`)

| Package | Rôle |
|---------|------|
| `react` + `react-dom` | Bibliothèque UI — composants, rendu, hooks |
| `react-router` | Gestion des routes côté client (SPA — Single Page Application) |
| `@reduxjs/toolkit` | Gestion de l'état global (store, slices, createAsyncThunk) |
| `react-redux` | Connecte Redux aux composants React (useSelector, useDispatch) |
| `axios` | Client HTTP pour faire les appels API vers le backend |
| `tailwindcss` | Framework CSS utilitaire (classes directement dans le HTML) |
| `lucide-react` | Bibliothèque d'icônes SVG modernes pour React |
| `vite` | Outil de build ultra-rapide (remplace Create React App) |

---

## 3. Backend — Fichiers de Démarrage

---

### `server/src/server.js`

#### 1. Qu'est-ce que c'est ?
Le **point d'entrée** du backend. C'est le premier fichier exécuté quand on lance le serveur.

#### 2. Pourquoi ça existe ?
Pour démarrer le serveur HTTP et se connecter à MongoDB.

#### 3. Code réel
```js
import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
```

#### 4. Explication
- `connectDB()` → appelle la fonction de connexion MongoDB définie dans `config/db.js`
- `process.env.PORT` → lit le port depuis les variables d'environnement (ou utilise 5000 par défaut)
- `app.listen()` → démarre le serveur HTTP sur le port donné
- `app` est importé depuis `app.js` qui contient toute la configuration Express

#### 5. Flux
```
npm run dev → nodemon → server.js → connectDB() + app.listen(5000)
```

#### 6. 🎤 Jury
> "Le fichier `server.js` est le point de démarrage de notre backend. Il se connecte à MongoDB grâce à `connectDB()` puis lance le serveur Express sur le port 5000 avec `app.listen()`."

---

### `server/src/config/db.js`

#### 1. Qu'est-ce que c'est ?
La **fonction de connexion à MongoDB** via Mongoose.

#### 2. Code réel
```js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connexion à MongoDB réussie.");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
  }
};
```

#### 3. Explication étape par étape
1. `dotenv.config()` → charge `.env` pour lire `MONGO_URL`
2. `mongoose.connect(MONGO_URL)` → établit la connexion à la base MongoDB
3. Si succès → log "Connexion à MongoDB réussie."
4. Si échec → log l'erreur (l'application continue mais les requêtes BDD échoueront)

#### 4. 🎤 Jury
> "Nous utilisons Mongoose pour se connecter à MongoDB. L'URL de connexion est stockée dans un fichier `.env` pour des raisons de sécurité — on ne met jamais les credentials dans le code source."

---

### `server/src/app.js`

#### 1. Qu'est-ce que c'est ?
Le fichier de **configuration Express** : il crée l'application, configure les middlewares globaux et monte toutes les routes.

#### 2. Code réel (simplifié)
```js
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
// ... autres imports de routes

const app = express();

app.use(cors());           // Autorise les requêtes cross-origin
app.use(express.json());   // Parse le body JSON des requêtes

app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applications);
app.use("/api/notification", notifications);
app.use("/api/dashboard", dashboard);
app.use("/api/reclamation", reclamation);
app.use("/api/saved-jobs", savedJobs);

export default app;
```

#### 3. Points importants
- `cors()` → sans ça, le navigateur bloque les requêtes du frontend (port 5173) vers l'API (port 5000)
- `express.json()` → sans ça, `req.body` serait `undefined`
- Chaque routeur est monté sur un préfixe d'URL (ex: tout ce qui commence par `/api/jobs` → `jobRouter`)

#### 4. 🎤 Jury
> "Dans `app.js`, on configure Express : on active CORS pour que le frontend puisse communiquer avec le backend, on parse le JSON, et on monte tous les routeurs sur leurs préfixes respectifs."

---

## 4. Backend — Les Modèles Mongoose

> Un modèle Mongoose définit la **structure d'une collection MongoDB**. C'est l'équivalent d'une table en SQL.

---

### `models/User.js`

#### 1. Qu'est-ce que c'est ?
Le schéma des utilisateurs. Un seul modèle User couvre les 3 rôles (Candidat, Entreprise, Admin) grâce au champ `role`.

#### 2. Structure réelle
```js
const userSchema = new mongoose.Schema({
  nom:        { type: String },
  prenom:     { type: String },
  email:      { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  telephone:  { type: String },
  photo:      { type: String },        // optionnel
  cvUrl:      { type: String },        // URL du CV (candidat)
  role: {
    type: String,
    enum: ["Candidat", "AdministrateurEntreprise", "Administrateur"],
    default: "Candidat",
  }
}, { timestamps: true })
```

#### 3. Points importants
- `unique: true` sur `email` → MongoDB crée un index unique, impossible d'avoir 2 comptes avec le même email
- `required: true` → Mongoose rejette le document si le champ est absent
- `enum` → liste blanche de valeurs autorisées pour `role`
- `timestamps: true` → Mongoose ajoute automatiquement `createdAt` et `updatedAt`
- `motDePasse` est stocké **haché** (bcryptjs), jamais en clair

#### 4. Que se passe-t-il si on supprime ce fichier ?
Plus aucune opération utilisateur ne fonctionne (inscription, connexion, profil, admin). L'application s'arrête complètement.

#### 5. 🎤 Jury
> "Le modèle `User` représente tous les utilisateurs de la plateforme. On utilise un champ `role` avec une liste de valeurs autorisées pour gérer les 3 types d'utilisateurs. Le mot de passe est toujours stocké haché grâce à bcryptjs."

---

### `models/Entreprise.js`

#### 1. Qu'est-ce que c'est ?
Un modèle séparé qui stocke les **informations spécifiques à l'entreprise** (distinct du User).

#### 2. Structure réelle
```js
const entrepriseSchema = new mongoose.Schema({
  user:          { type: ObjectId, ref: "User", required: true, unique: true },
  nomEntreprise: { type: String, required: true, trim: true },
  description:   { type: String, default: "" },
  adresse:       { type: String, default: "" },
  ville:         { type: String, default: "" },
  siteWeb:       { type: String, default: "" },
  logo:          { type: String, default: "" },
  estBloquee:    { type: Boolean, default: false },  // blocage par admin
}, { timestamps: true })
```

#### 3. Relation avec User
- `user` référence l'`_id` du User (relation 1-to-1)
- Quand un utilisateur s'inscrit comme entreprise (`role: "AdministrateurEntreprise"`), un document Entreprise est automatiquement créé
- `estBloquee` permet à l'admin de bloquer une entreprise

#### 4. 🎤 Jury
> "On a choisi de séparer les données d'entreprise du User pour garder le modèle User propre et générique. La relation est faite par une référence à l'ObjectId du User."

---

### `models/Job.js`

#### 1. Qu'est-ce que c'est ?
Le schéma des offres d'emploi publiées par les entreprises.

#### 2. Structure réelle
```js
const jobSchema = mongoose.Schema({
  titre:              { type: String, required: true },
  description:        { type: String, required: true },
  typeContrat:        { type: String, enum: ["CDI","CDD","Stage","Freelance"], required: true },
  domaine:            { type: String, required: true },
  ville:              { type: String, required: true },
  competencesRequises: [{ type: String, required: true }],  // tableau de strings
  salaire:            { type: Number, default: 0 },
  dateLimite:         { type: Date, required: true },
  entreprise:         { type: ObjectId, ref: "User", required: true },
  statut:             { type: String, enum: ["Ouverte","Fermée"], default: "Ouverte" },
}, { timestamps: true })
```

#### 3. Points importants
- `competencesRequises` est un **tableau de chaînes** (ex: `["React", "Node.js", "MongoDB"]`)
- `entreprise` référence le `User` (le compte entreprise qui a créé l'offre)
- `statut` permet d'ouvrir/fermer une offre sans la supprimer
- Les candidats ne peuvent postuler que si `statut === "Ouverte"` et `dateLimite` non dépassée

#### 4. 🎤 Jury
> "Le modèle Job stocke les offres d'emploi. Chaque offre appartient à une entreprise via une référence. Le champ `statut` permet à l'entreprise de fermer une offre sans la supprimer définitivement."

---

### `models/Application.js`

#### 1. Qu'est-ce que c'est ?
Le schéma des **candidatures** — quand un candidat postule à une offre.

#### 2. Structure réelle
```js
const applicationSchema = new mongoose.Schema({
  candidat: { type: ObjectId, ref: "User", required: true },
  job:      { type: ObjectId, ref: "Job",  required: true },
  cv:       { type: String, required: true },         // URL du CV
  lettreMotivation: { type: String, default: "" },
  statut:   {
    type: String,
    enum: ["En attente", "Acceptée", "Refusée"],
    default: "En attente"
  }
}, { timestamps: true })

// Index composé unique : un candidat ne peut postuler qu'une fois par offre
applicationSchema.index({ candidat: 1, job: 1 }, { unique: true })
```

#### 3. L'index composé unique — très important !
- `applicationSchema.index({ candidat: 1, job: 1 }, { unique: true })` → MongoDB refuse l'insertion si la même paire candidat/job existe déjà
- Cela empêche un candidat de postuler deux fois à la même offre
- C'est géré au niveau base de données (protection maximale)

#### 4. 🎤 Jury
> "Le modèle Application a un index composé unique sur la paire `candidat + job`. Ça garantit au niveau de la base de données qu'un candidat ne peut postuler qu'une seule fois à la même offre."

---

### `models/Notification.js`

#### 1. Qu'est-ce que c'est ?
Le schéma des notifications envoyées aux utilisateurs.

#### 2. Structure réelle
```js
const notificationSchema = new mongoose.Schema({
  destinataire: { type: ObjectId, ref: "User", required: true },
  titre:   { type: String, required: true },
  message: { type: String, required: true },
  lu:      { type: Boolean, default: false },
  type:    { type: String, enum: ["Candidature","Offre","Systeme","Reclamation"], default: "Candidature" },
  lien:    { type: String, default: "" }  // URL de redirection au clic
}, { timestamps: true })
```

#### 3. Comment les notifications sont créées ?
Elles sont créées automatiquement par le backend quand un statut de candidature change (via `createNotificationService`). Le frontend les récupère via l'API et les affiche dans le Header.

#### 4. 🎤 Jury
> "Les notifications sont créées automatiquement côté backend. Par exemple, quand une entreprise accepte une candidature, on crée une notification pour le candidat avec un lien vers ses candidatures. Le candidat les voit en temps réel dans le header."

---

### `models/Reclamation.js`

#### 1. Qu'est-ce que c'est ?
Le schéma des **réclamations/signalements** soumis par les candidats à propos d'une offre.

#### 2. Structure réelle
```js
const reclamationSchema = new mongoose.Schema({
  auteur:      { type: ObjectId, ref: "User", required: true },
  job:         { type: ObjectId, ref: "Job",  required: true },
  motif:       { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  statut:      { type: String, enum: ["En attente","Traitée","Rejetée"], default: "En attente" }
}, { timestamps: true })
```

#### 3. Cycle de vie
1. Candidat soumet → statut `"En attente"`
2. Admin traite → statut `"Traitée"` ou `"Rejetée"`

#### 4. 🎤 Jury
> "La réclamation permet à un candidat de signaler une offre frauduleuse ou problématique. L'admin voit toutes les réclamations dans son interface et peut les traiter ou les rejeter."

---

### `models/SavedJob.js`

#### 1. Qu'est-ce que c'est ?
Le schéma pour sauvegarder des offres en favoris.

#### 2. Structure réelle
```js
const savedJobSchema = new mongoose.Schema({
  candidat: { type: ObjectId, ref: "User", required: true },
  job:      { type: ObjectId, ref: "Job",  required: true },
}, { timestamps: true })

savedJobSchema.index({ candidat: 1, job: 1 }, { unique: true })
// Unique index: prevents a candidate from saving the same job more than once
```

#### 3. 🎤 Jury
> "Comme pour les candidatures, on a un index unique qui empêche de sauvegarder la même offre deux fois. La fonctionnalité est implémentée comme un toggle : si l'offre est déjà sauvegardée, on la retire ; sinon, on la sauvegarde."

---

### `models/Competence.js`

#### 1. Qu'est-ce que c'est ?
Un modèle séparé qui stocke les **compétences d'un candidat** (relation 1-to-1 avec User).

#### 2. Structure réelle
```js
const competenceSchema = new mongoose.Schema({
  competences: [{ type: String, required: true, trim: true }],
  candidat:    { type: ObjectId, ref: "User", required: true, unique: true }
}, { timestamps: true })
```

#### 3. Pourquoi séparé du User ?
Pour garder le modèle User simple. Les compétences sont un tableau de strings (ex: `["React", "Node.js"]`) géré séparément et fusionné dans le User lors du fetch profil.

---

## 5. Backend — Les Middlewares

> Un middleware est une **fonction intermédiaire** qui s'exécute entre la réception d'une requête HTTP et son traitement par le contrôleur. Il a accès à `req`, `res`, et `next`.

---

### `middleware/authentication.middleware.js`

#### 1. Qu'est-ce que c'est ?
Le middleware qui **vérifie le token JWT** dans l'en-tête de chaque requête protégée.

#### 2. Code réel
```js
export const authentificationCheck = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "authentification required" });
  }

  const token = authHeader.split(" ")[1];  // "Bearer TOKEN" → prend TOKEN
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id, role } → disponible pour les middlewares suivants
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "token invalide ou expiré" });
  }
}
```

#### 3. Explication étape par étape
1. Lit l'en-tête `Authorization` (ex: `"Bearer eyJhbGciOi..."`)
2. Si absent → 401 Unauthorized
3. Extrait le token (après "Bearer ")
4. Vérifie le token avec `jwt.verify()` et `JWT_SECRET`
5. Si valide → décode le payload `{id, role}` et l'attache à `req.user`
6. Appelle `next()` → passe au middleware/contrôleur suivant
7. Si invalide → 401 avec message d'erreur

#### 4. Flux de données
```
Requête HTTP
    → Header: "Authorization: Bearer eyJhbG..."
    → authentificationCheck()
    → jwt.verify() → { id: "abc123", role: "Candidat" }
    → req.user = { id, role }
    → next() → contrôleur
```

#### 5. 🎤 Jury
> "Ce middleware vérifie le token JWT sur chaque route protégée. Il extrait le token de l'en-tête Authorization, le vérifie avec la clé secrète, et ajoute les informations de l'utilisateur à `req.user`. Ainsi, tous les contrôleurs suivants savent qui fait la requête."

---

### `middleware/authorization.middleware.js`

#### 1. Qu'est-ce que c'est ?
Le middleware de **vérification des rôles**. Il s'utilise APRÈS `authentificationCheck`.

#### 2. Code réel
```js
export const authorizationCheck = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "accès refusé, vous n'avez pas l'autorisation"
      });
    }
    next();
  }
}
```

#### 3. C'est une **factory function** (fonction qui retourne une fonction)
- On l'appelle avec les rôles autorisés : `authorizationCheck("Candidat")` ou `authorizationCheck("Administrateur", "AdministrateurEntreprise")`
- Elle retourne un middleware qui vérifie si `req.user.role` est dans la liste

#### 4. Exemple d'utilisation
```js
router.post("/apply/:jobId",
  authentificationCheck,               // 1. Token valide ?
  authorizationCheck("Candidat"),      // 2. Rôle = Candidat ?
  checkJobIsAvailable,                 // 3. Offre ouverte ?
  applyToJob                           // 4. Traitement
)
```

#### 5. 🎤 Jury
> "Après avoir vérifié l'identité avec le token JWT, on vérifie les droits avec `authorizationCheck`. Par exemple, seuls les Candidats peuvent postuler, et seuls les Administrateurs peuvent accéder aux réclamations."

---

### `middleware/checkJobIsAvailable.js`

#### 1. Qu'est-ce que c'est ?
Vérifie qu'une offre existe, est **ouverte** et **dans les délais** avant d'autoriser une postulation.

#### 2. Code réel
```js
export const checkJobIsAvailable = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ ... "Offre non trouvée" });
    if (job.statut === "Fermée") return res.status(403).json({ ... "offre fermée" });
    if (job.dateLimite && new Date(job.dateLimite) < new Date()) {
      return res.status(403).json({ ... "date limite dépassée" });
    }

    req.job = job;  // disponible pour le contrôleur
    next();
  } catch (error) {
    return res.status(500).json({ ... });
  }
}
```

#### 3. 🎤 Jury
> "Ce middleware protège la route de postulation. Il vérifie d'abord que l'offre existe, qu'elle n'est pas fermée, et que la date limite n'est pas dépassée. C'est une couche de sécurité métier."

---

### `middleware/checkJobOwnership.middleware.js`

#### 1. Qu'est-ce que c'est ?
Vérifie qu'une entreprise est bien **propriétaire de l'offre** avant de la modifier ou supprimer.

#### 2. Code réel
```js
export const checkJobOwnership = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ ... });

  // Un admin peut toujours agir, sinon vérifier la propriété
  if (userRole !== "Administrateur" && job.entreprise.toString() !== userId) {
    return res.status(403).json({ ... "non autorisé" });
  }

  req.job = job;
  next();
}
```

#### 3. 🎤 Jury
> "Ce middleware garantit qu'une entreprise ne peut modifier que ses propres offres. L'admin, lui, peut modifier n'importe quelle offre."

---

### `middleware/preventRoleUpdate.middleware.js`

#### 1. Qu'est-ce que c'est ?
Empêche un utilisateur de modifier son propre `role`, `email`, ou `motDePasse` via la route de mise à jour du profil.

#### 2. Code réel
```js
export const preventRoleUpdate = (req, res, next) => {
  if (req.body.role)       delete req.body.role;
  if (req.body.email)      delete req.body.email;
  if (req.body.motDePasse) delete req.body.motDePasse;
  next();
}
```

#### 3. 🎤 Jury
> "Pour sécuriser la mise à jour du profil, ce middleware supprime les champs sensibles du body avant même d'atteindre le contrôleur. Ainsi, même si un utilisateur envoie `role: 'Administrateur'` dans sa requête, ça sera ignoré."

---

### `middleware/validate.js`

#### 1. Qu'est-ce que c'est ?
Middleware qui récupère les erreurs de validation `express-validator` et renvoie une réponse 400 si des erreurs existent.

#### 2. Fonctionnement
- Les validators (ex: `registerValidator`) ajoutent des erreurs à la requête
- `validate.js` les lit avec `validationResult(req)`
- Si erreurs → retourne 400 avec la liste des erreurs
- Si pas d'erreurs → `next()` pour continuer

---

## 6. Backend — Les Services

> Les services contiennent la **logique d'accès à la base de données**. Les contrôleurs délèguent le travail aux services pour garder le code propre et réutilisable.

---

### `services/user.service.js`

#### Fonctions principales

**`registerUser(userData)`**
1. Vérifie si l'email existe déjà → erreur si oui
2. Normalise le rôle (`"Entreprise"` → `"AdministrateurEntreprise"`)
3. Hash le mot de passe avec `bcrypt.hash(motDePasse, 10)` (10 = cost factor)
4. Crée le User en BDD
5. Si entreprise → crée aussi un document Entreprise
6. Génère un token JWT (`jwt.sign({id, role}, JWT_SECRET, {expiresIn: "1d"})`)
7. Retourne `{utilisateur, token}` (sans le mot de passe)

**`loginUser(email, motDePasse)`**
1. Nettoie l'email (trim + regex insensible à la casse)
2. Cherche le User par email (avec `select("+motDePasse")` pour récupérer le hash)
3. Compare avec `bcrypt.compare(motDePasse, hash)`
4. Si candidat → récupère ses compétences depuis la collection Competence
5. Si entreprise → récupère le document Entreprise associé
6. Génère un nouveau token JWT
7. Retourne `{utilisateur, token}` (sans le mot de passe)

**`getUserProfileService(userId)`**
- Récupère le User par ID (sans `motDePasse`)
- Enrichit avec compétences (si candidat) ou info entreprise (si entreprise)

**`updateUserProfileService(userId, updateData)`**
- Sépare les données entreprise des données user
- Met à jour le User avec `findByIdAndUpdate`
- Met à jour ou crée (upsert) les compétences/entreprise séparément
- Retourne le user mis à jour avec toutes ses données enrichies

**`toggleBlockCompanyService(companyId)`**
- Inverse le booléen `estBloquee` de l'Entreprise
- Retourne l'entreprise modifiée

#### 🎤 Jury
> "J'ai séparé la logique métier dans des services. Par exemple, `loginUser` ne fait pas juste un simple `findOne` — il gère la casse de l'email, vérifie le mot de passe haché, et enrichit le résultat avec les données liées (compétences pour le candidat, info entreprise pour le recruteur)."

---

### `services/application.service.js`

#### Fonctions principales

**`createCandidatureService(candidatId, jobId, applicationData)`**
1. Vérifie que l'offre existe
2. Vérifie que l'offre est ouverte
3. Vérifie que le CV est fourni
4. Crée l'Application en BDD
5. (L'index unique empêche la double candidature au niveau MongoDB)

**`updateApplicationStatusService(applicationId, entrepriseId, newStatus)`**
1. Récupère la candidature avec son offre (populate)
2. Vérifie que l'entreprise est bien propriétaire de l'offre
3. Met à jour le statut
4. **Crée une notification** pour le candidat via `createNotificationService()`
5. Retourne la candidature mise à jour

#### 🎤 Jury
> "Quand l'entreprise change le statut d'une candidature, on déclenche automatiquement la création d'une notification pour le candidat. Ça se passe dans le service, sans que le contrôleur ait à s'en occuper."

---

### `services/notification.service.js`

#### Fonctions

**`createNotificationService(destinataireId, titre, message, type, lien)`**
- Crée une notification en BDD directement
- Appelée par d'autres services (application, etc.)

**`getUserNotificationService(userId)`**
- Retourne toutes les notifications d'un utilisateur, triées par date (plus récente d'abord)

**`markNotificationAsReadService(notificationId, userId)`**
- Vérifie que la notification appartient à l'utilisateur
- Passe `lu = true`

---

### `services/job.services.js`

#### Fonctions principales

**`getAllJobsService(filters)`**
- Construit dynamiquement un objet `query` selon les filtres passés (keyword, ville, domaine, typeContrat, statut)
- Utilise `$regex` pour les recherches textuelles insensibles à la casse
- Compte les offres totales, ouvertes, fermées séparément
- Retourne les jobs avec l'info entreprise (populate)

**`toggleJobStatusService(jobId, requestedStatut)`**
- Si un statut est fourni → l'applique directement
- Sinon → inverse le statut actuel ("Ouverte" → "Fermée" et vice-versa)

---

### `services/dashboard.service.js`

#### Fonctions

**`getEntrepriseDashboardService(entrepriseId)`**
1. Compte les offres de l'entreprise
2. Récupère les IDs de toutes les offres
3. Compte les candidatures sur ces offres
4. Utilise une **aggregation MongoDB** pour grouper les candidatures par statut
5. Retourne `{totalJobs, totalApplications, statusBreakdown}`

**`getAdminDashboardService()`**
- Compte : total users, candidats, entreprises, offres, candidatures
- Retourne toutes ces stats

#### 🎤 Jury
> "Pour le dashboard, j'utilise une agrégation MongoDB avec `$match` et `$group` pour compter les candidatures par statut. C'est plus efficace qu'une requête par statut."

---

## 7. Backend — Les Contrôleurs

> Les contrôleurs **reçoivent la requête HTTP**, appellent le service approprié, et **renvoient la réponse JSON**.

---

### Pattern général des contrôleurs

```js
export const nomFonction = async (req, res) => {
  try {
    const result = await nomService(req.params.id, req.body, req.user.id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
```

Toujours :
- `try/catch` → gestion des erreurs
- `res.status(XXX).json({ success: bool, ... })` → format de réponse cohérent
- Le contrôleur ne contient PAS de logique BDD directe → délégué au service

---

### `controllers/user.controller.js`

| Fonction | Route | Description |
|----------|-------|-------------|
| `register` | POST `/api/users/register` | Crée un compte |
| `login` | POST `/api/users/login` | Connexion + JWT |
| `getProfile` | GET `/api/users/profile` | Profil de l'utilisateur connecté |
| `updateProfile` | PUT `/api/users/profile` | Mise à jour du profil |
| `logout` | POST `/api/users/logout` | Déconnexion (clear cookie) |
| `getAllUsers` | GET `/api/users` | Admin : liste tous les users |
| `deleteUser` | DELETE `/api/users/:id` | Admin : supprime un user |
| `getAllCompanies` | GET `/api/users/companies/all` | Admin : liste les entreprises |
| `toggleBlockCompany` | PATCH `/api/users/companies/:id/block` | Admin : bloquer/débloquer |

---

### `controllers/job.controller.js`

| Fonction | Route | Description |
|----------|-------|-------------|
| `createJob` | POST `/api/jobs` | Entreprise : publier une offre |
| `getAllJobs` | GET `/api/jobs` | Public : lister les offres (avec filtres) |
| `getJobById` | GET `/api/jobs/:id` | Détails d'une offre |
| `updateJob` | PUT `/api/jobs/:id` | Entreprise : modifier son offre |
| `deleteJob` | DELETE `/api/jobs/:id` | Entreprise/Admin : supprimer |
| `toggleJobStatus` | PATCH `/api/jobs/:id/status` | Ouvrir/fermer l'offre |

---

### `controllers/application.controller.js`

| Fonction | Route | Description |
|----------|-------|-------------|
| `applyToJob` | POST `/api/applications/apply/:jobId` | Candidat postule |
| `getMyApplications` | GET `/api/applications/my-applications` | Candidat : ses candidatures |
| `getApplicationsByJob` | GET `/api/applications/job/:jobId` | Entreprise : candidatures d'une offre |
| `updateApplicationStatus` | PATCH `/api/applications/:id/status` | Entreprise : accepter/refuser |

---

### `controllers/reclamation.controller.js`

| Fonction | Description |
|----------|-------------|
| `createReclamation` | Vérifie que l'offre existe, crée la réclamation |
| `getAllReclamation` | Admin : toutes les réclamations avec auteur et offre |
| `updateReclamationStatus` | Admin : met à jour le statut |

---

## 8. Backend — Les Routes Express

> Les routes **connectent une URL + méthode HTTP à une chaîne de middlewares + contrôleur**.

### Structure d'une route
```js
router.post(
  "/chemin",
  middleware1,        // ex: authentificationCheck
  middleware2,        // ex: authorizationCheck("Candidat")
  middleware3,        // ex: validation
  controllerFunction  // traitement final
)
```

### `routes/user.routes.js` (préfixe: `/api/users`)

```
POST   /register       → registerValidator → validate → register
POST   /login          → loginValidator → validate → login
GET    /profile        → authentificationCheck → getProfile
PUT    /profile        → authentificationCheck → preventRoleUpdate → updateProfile
POST   /logout         → authentificationCheck → logout
GET    /               → auth → authorizationCheck("Administrateur") → getAllUsers
DELETE /:id            → auth → authorizationCheck("Administrateur") → deleteUser
GET    /companies/all  → auth → authorizationCheck("Administrateur") → getAllCompanies
PATCH  /companies/:id/block → auth → authorizationCheck("Administrateur") → toggleBlockCompany
```

### `routes/job.routes.js` (préfixe: `/api/jobs`)

```
GET    /           → getAllJobs              (public, pas d'auth)
GET    /:id        → getJobById             (public)
POST   /           → auth → authorizationCheck("AdministrateurEntreprise") → createJobValidator → validate → createJob
PUT    /:id        → auth → authorizationCheck("AdministrateurEntreprise") → checkJobOwnership → updateJob
DELETE /:id        → auth → authorizationCheck("AdministrateurEntreprise","Administrateur") → checkJobOwnership → deleteJob
PATCH  /:id/status → auth → authorizationCheck("AdministrateurEntreprise") → checkJobOwnership → toggleJobStatus
```

### `routes/application.routes.js` (préfixe: `/api/applications`)

```
POST  /apply/:jobId       → auth → authorizationCheck("Candidat") → checkJobIsAvailable → applyToJob
GET   /my-applications    → auth → authorizationCheck("Candidat") → getMyApplications
GET   /job/:jobId         → auth → authorizationCheck("AdministrateurEntreprise") → getApplicationsByJob
PATCH /:id/status         → auth → authorizationCheck("AdministrateurEntreprise") → updateApplicationStatus
```

### `routes/notification.routes.js` (préfixe: `/api/notification`)

```
GET   /my-notifications → auth → getMyNotifications
PATCH /:id/read         → auth → markAsRead
```

### `routes/reclamation.routes.js` (préfixe: `/api/reclamation`)

```
POST  /           → auth → createReclamation       (tous les connectés)
GET   /           → auth → authorizationCheck("Administrateur") → getAllReclamation
PATCH /:id/status → auth → authorizationCheck("Administrateur") → updateReclamationStatus
```

### `routes/savedJob.routes.js` (préfixe: `/api/saved-jobs`)

```
POST /toggle   → auth → authorizationCheck("Candidat") → toggleSaveJob
GET  /my-saved → auth → authorizationCheck("Candidat") → getMySavedJobs
```

#### 🎤 Jury
> "Les routes Express sont le point d'entrée de notre API. Chaque route définit une chaîne de middlewares : d'abord l'authentification JWT, ensuite la vérification des rôles, puis les validations, et enfin le contrôleur. C'est une architecture en couches."

---

## 9. Frontend — Point d'Entrée

---

### `client/src/main.jsx`

```jsx
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
```

#### Points importants
- `createRoot` → API React 19 pour le rendu
- `Provider store={store}` → rend le store Redux accessible à TOUS les composants de l'arbre
- `StrictMode` → détecte les effets de bord et les dépréciations en dev

---

### `client/src/App.jsx`

```jsx
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
```

- `BrowserRouter` → active le système de routing basé sur l'URL du navigateur
- `AppRoutes` → définit toutes les routes de l'application

---

## 10. Frontend — Redux Store & Slices

> Redux Toolkit gère l'**état global** de l'application (données partagées entre composants).

---

### `app/store.js` + `app/rootReducer.js`

```js
// rootReducer.js — combine tous les slices
const rootReducer = combineReducers({
  auth:          authReducer,          // utilisateur connecté
  offres:        offreReducer,         // offres d'emploi
  candidatures:  candidatureReducer,   // candidatures
  notifications: notificationReducer,  // notifications
  reclamations:  reclamationReducer,   // réclamations
});

// store.js — configure le store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
```

#### Schéma du Store
```
store
├── auth          → { token, user, role, loading, error, successMessage, usersList, companiesList }
├── offres        → { jobs, selectedJob, selectedJobEntreprise, loading, ... }
├── candidatures  → { myApplications, applicationsByJob, savedJobs, loading, ... }
├── notifications → { notifications, unreadCount, loading, error }
└── reclamations  → { reclamations, loading, actionLoading, successMessage, error }
```

---

### `features/auth/authSlice.js`

#### État initial
```js
{
  token: localStorage.getItem("token") || null,  // persiste entre les refresh
  user: null,
  role: null,
  loading: false,
  error: null,
  successMessage: null,
  usersList: [],
  companiesList: []
}
```

#### Async Thunks (actions asynchrones)
| Thunk | Description |
|-------|-------------|
| `registerUser` | Inscrit l'utilisateur, stocke le token |
| `loginUser` | Connecte, stocke le token dans localStorage |
| `getProfile` | Récupère le profil complet de l'utilisateur connecté |
| `updateProfile` | Met à jour le profil |
| `logoutUser` | Supprime le token, vide le state |
| `fetchAllUsers` | Admin : charge tous les utilisateurs |
| `deleteUser` | Admin : supprime un utilisateur |
| `fetchAllCompanies` | Admin : charge toutes les entreprises |
| `toggleBlockCompany` | Admin : bloquer/débloquer une entreprise |

#### Reducers synchrones
| Reducer | Description |
|---------|-------------|
| `logout` | Supprime le token localStorage + vide le state |
| `clearError` | Efface le message d'erreur |
| `clearSuccessMessage` | Efface le message de succès |

#### 🎤 Jury
> "L'authSlice gère toute l'authentification côté frontend. Le token JWT est stocké dans `localStorage` pour persister entre les rechargements de page. Au démarrage, on lit ce token pour initialiser le state — si le token est là, l'utilisateur est considéré comme connecté."

---

### `features/offres/offreSlice.js`

#### Async Thunks
| Thunk | Endpoint | Description |
|-------|----------|-------------|
| `fetchJobs` | GET `/api/jobs` | Charge toutes les offres (avec filtres) |
| `fetchJobById` | GET `/api/jobs/:id` | Charge les détails d'une offre |
| `createJob` | POST `/api/jobs` | Crée une offre |
| `updateJob` | PUT `/api/jobs/:id` | Modifie une offre |
| `deleteJob` | DELETE `/api/jobs/:id` | Supprime une offre |
| `toggleJobStatus` | PATCH `/api/jobs/:id/status` | Ouvrir/fermer |
| `fetchEntrepriseStats` | GET `/api/dashboard/entreprise` | Stats entreprise |
| `fetchAdminStats` | GET `/api/dashboard/admin` | Stats admin |

---

### `features/candidatures/candidatureSlice.js`

#### Async Thunks
| Thunk | Description |
|-------|-------------|
| `applyToJob` | Postule à une offre |
| `fetchMyApplications` | Charge mes candidatures |
| `fetchApplicationsByJob` | Charge les candidatures d'une offre (vue entreprise) |
| `updateApplicationStatus` | Accepter/Refuser une candidature |
| `toggleSavedJob` | Sauvegarder/retirer une offre des favoris |
| `fetchMySavedJobs` | Charge mes offres sauvegardées |

---

### `features/notifications/notificationSlice.js`

#### Async Thunks
| Thunk | Description |
|-------|-------------|
| `fetchMyNotifications` | Récupère mes notifications depuis l'API |
| `markNotificationAsRead` | Marque une notification comme lue |

#### extraReducers (ce qui se passe en réponse aux thunks)
- `fetchMyNotifications.fulfilled` → met à jour `notifications` et recalcule `unreadCount` = nombre de notifications où `lu === false`
- `markNotificationAsRead.fulfilled` → met à jour la notif dans le tableau + décrémente `unreadCount`

---

### `features/reclamations/reclamationSlice.js`

#### Async Thunks
| Thunk | Description |
|-------|-------------|
| `createReclamation` | Soumet une réclamation |
| `fetchAllReclamations` | Admin : charge toutes les réclamations |
| `updateReclamationStatus` | Admin : change le statut |

---

## 11. Frontend — Axios & Services API

---

### `utils/axiosInstance.js` — LE COEUR DES APPELS API

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Intercepteur de requête : ajoute automatiquement le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur de réponse : retourne directement response.data
api.interceptors.response.use(
  (response) => response.data,  // ← on retourne le body JSON directement
  (error) => Promise.reject(error)
);

export default api;
```

#### Points importants
- **Intercepteur de requête** : ajoute automatiquement `Authorization: Bearer TOKEN` à CHAQUE requête — on n'a jamais à le faire manuellement
- **Intercepteur de réponse** : retourne `response.data` → on reçoit directement l'objet `{ success, data, message }` sans `response.data.data`
- `baseURL` → toutes les requêtes partent de `http://localhost:5000/api`

#### 🎤 Jury
> "On utilise un intercepteur Axios pour ajouter automatiquement le token JWT à chaque requête. Comme ça, dans les services, on écrit juste `api.get('/jobs')` et le token est toujours envoyé."

---

### Les Services Frontend

Chaque feature a son service qui encapsule les appels Axios :

**`authService.js`** → register, login, getProfile, updateProfile, logout, getAllUsers, deleteUser, getAllCompanies, toggleBlockCompany

**`offreService.js`** → getAllJobs, getJobById, createJob, updateJob, deleteJob, toggleJobStatus, getEntrepriseStats, getAdminStats

**`candidatureService.js`** → applyToJob, getMyApplications, getApplicationsByJob, updateApplicationStatus, toggleSavedJob, getMySavedJobs

**`notificationService.js`** → getMyNotifications, markAsRead

**`reclamationService.js`** → createReclamation, getAllReclamations, updateReclamationStatus

---

## 12. Frontend — Layout & Routing

---

### `routes/AppRoutes.jsx`

Définit toutes les routes de l'application avec React Router.

#### Structure des routes
```
/                  → RootRedirect (redirige selon le rôle)
/login             → Login (public)
/register/candidat → RegisterCandidat (public)
/register/entreprise → RegisterEntreprise (public)

/candidat/*        → ProtectedRoute(["Candidat"]) → LayoutShell → pages candidat
  /candidat/dashboard
  /candidat/jobs
  /candidat/jobs/:id
  /candidat/applications
  /candidat/saved-jobs
  /candidat/recommendations
  /candidat/complaints
  /candidat/profil

/entreprise/*      → ProtectedRoute(["AdministrateurEntreprise"]) → LayoutShell → pages entreprise
  /entreprise/dashboard
  /entreprise/jobs
  /entreprise/jobs/create
  /entreprise/jobs/edit/:id
  /entreprise/applications
  /entreprise/profil

/admin/*           → ProtectedRoute(["Administrateur"]) → LayoutShell → pages admin
  /admin/dashboard
  /admin/users
  /admin/companies
  /admin/jobs
  /admin/complaints
  /admin/profil

*                  → NotFound (404)
```

#### `RootRedirect` Component
```jsx
const RootRedirect = () => {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role === "AdministrateurEntreprise") return <Navigate to="/entreprise/dashboard" replace />;
  if (user?.role === "Administrateur") return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/candidat/dashboard" replace />;
};
```
→ Redirige automatiquement vers le bon dashboard selon le rôle

---

### `components/layout/ProtectedRoute.jsx`

```jsx
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user, loading } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (!user && loading) return <Loader2 ... />;  // spinner pendant chargement
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirige vers le bon dashboard si mauvais rôle
    if (user.role === "AdministrateurEntreprise") return <Navigate to="/entreprise/dashboard" />;
    if (user.role === "Administrateur")           return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/candidat/dashboard" />;
  }

  return children;
};
```

#### 🎤 Jury
> "Le `ProtectedRoute` est un composant de sécurité côté frontend. Si l'utilisateur n'est pas connecté, il est redirigé vers /login. S'il est connecté mais n'a pas le bon rôle, il est redirigé vers son dashboard. Cette protection est complémentaire à celle du backend."

---

### `components/layout/LayoutShell.jsx`

Structure visuelle principale pour tous les utilisateurs connectés :

```jsx
export const LayoutShell = () => {
  // Recharge toujours le profil au montage pour avoir des données fraîches
  useEffect(() => {
    if (token) dispatch(getProfile());
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-[#0B0E14] ...">
      <Header />           ← Barre du haut (logo + notifs + avatar)
      <div className="flex flex-1">
        <Sidebar />        ← Menu latéral (liens selon le rôle)
        <main>
          <Outlet />       ← Contenu de la page active (React Router)
        </main>
      </div>
    </div>
  );
};
```

#### `<Outlet />`
C'est un placeholder React Router — il affiche le composant de la route enfant active. Ex: si l'URL est `/candidat/jobs`, il affiche `<JobList />`.

---

### `components/layout/Header.jsx`

#### Ce qu'il fait
1. Lit les notifications depuis Redux (`state.notifications`)
2. Affiche la cloche avec un badge rouge si `unreadCount > 0`
3. Dropdown : affiche les notifications au clic
4. Clic sur une notif → `markNotificationAsRead()` + navigation vers `notif.lien`
5. Avatar : affiche l'initiale du prénom ou nom si pas de photo

#### Lecture de Redux
```js
const { user } = useSelector((state) => state.auth);
const { notifications, unreadCount } = useSelector((state) => state.notifications);
```

---

### `components/layout/Sidebar.jsx`

#### Ce qu'il fait
- Lit le `role` de l'utilisateur depuis Redux
- Affiche les bons liens de navigation selon le rôle :
  - Candidat : Dashboard, Offres, Candidatures, Enregistrées, Recommandations, Réclamations, Profil
  - Entreprise : Dashboard, Mes Offres, Candidatures Reçues, Profil
  - Admin : Dashboard, Utilisateurs, Entreprises, Offres, Réclamations, Profil
- Bouton Déconnexion → `logoutUser()` + navigation vers `/login`

---

### `utils/formatters.js`

Fonctions utilitaires pour formater l'affichage :

| Fonction | Entrée | Sortie |
|----------|--------|--------|
| `formatDate("2024-01-15")` | string ISO | `"15 janv. 2024"` |
| `formatDateTime("2024-01-15T14:30")` | string ISO | `"15 janv. 2024 à 14:30"` |
| `formatSalary(5000)` | number | `"5 000 DH/mois"` |
| `formatSalary(0)` | 0 | `"À négocier"` |
| `getStatusBadge("Acceptée")` | string | classes CSS Tailwind vertes |
| `getStatusBadge("En attente")` | string | classes CSS Tailwind orange |
| `getStatusBadge("Refusée")` | string | classes CSS Tailwind rouges |

---

## 13. Frontend — Pages par Rôle

---

### Pages Candidat

**`CandidatDashboard.jsx`**
- Affiche : stats perso (candidatures total, acceptées, en attente, offres sauvegardées), 3 dernières offres ouvertes, 4 dernières candidatures
- Redux : `fetchJobs`, `fetchMyApplications`, `fetchMySavedJobs`

**`JobList.jsx`**
- Liste toutes les offres avec filtres (keyword, ville, domaine, typeContrat, statut)
- Bouton "Sauvegarder" sur chaque offre → `toggleSavedJob`
- Lien "Voir les détails" → `/candidat/jobs/:id`

**`JobDetails.jsx`**
- Détails complets d'une offre
- Modal de postulation : champ CV (URL), lettre de motivation → `applyToJob`
- Formulaire de réclamation → `createReclamation`
- Vérifie si déjà postulé pour masquer/griser le bouton

**`MyApplications.jsx`**
- Liste toutes les candidatures du candidat avec statut (badge coloré)
- Lien de téléchargement du CV soumis

**`SavedJobs.jsx`**
- Offres sauvegardées
- Bouton retrait → `toggleSavedJob`

**`Recommendations.jsx`**
- Calcule la correspondance par intersection de compétences (sans score %)
- Trie par nombre de compétences communes (overlapCount)
- N'affiche que les offres avec au moins 1 compétence commune

**`Complaints.jsx`**
- Formulaire simple : motif + description
- Sélectionner une offre existante → `createReclamation`

**`Profile.jsx`**
- Formulaire de mise à jour : prénom, nom, téléphone, CV URL
- Gestion des compétences : ajout/retrait de tags
- Avatar avec initiales automatiques

---

### Pages Entreprise

**`EntrepriseDashboard.jsx`**
- Stats : total offres, total candidatures, répartition par statut
- Liste des offres récentes avec lien vers candidatures

**`ManageJobs.jsx`**
- Tableau de toutes les offres de l'entreprise
- Actions : Modifier, Ouvrir/Fermer (toggle statut), Supprimer

**`CreateEditJob.jsx`**
- Formulaire unique pour créer ET modifier une offre
- Détecte si c'est une édition via `useParams().id`
- Gestion des `competencesRequises` : ajout par tag

**`CandidateApplications.jsx`**
- Filtre par offre (via query params URL)
- Affiche chaque candidature : infos candidat, lettre de motivation, lien CV, boutons Accepter/Refuser
- `updateApplicationStatus` → déclenche une notification backend

**`CompanyProfile.jsx`**
- Mise à jour : prénom/nom du contact, téléphone, nom entreprise, description, adresse, ville, site web
- Avatar avec initiales du nom d'entreprise

---

### Pages Admin

**`AdminDashboard.jsx`**
- Stats globales : total users, candidats, entreprises, offres, candidatures
- Graphique de répartition

**`ManageUsers.jsx`**
- Liste de tous les utilisateurs (recherche par nom/email)
- Bouton supprimer → `deleteUser`

**`ManageCompanies.jsx`**
- Liste de toutes les entreprises avec info contact
- Bouton bloquer/débloquer → `toggleBlockCompany`

**`ManageAllJobs.jsx`**
- Toutes les offres de toutes les entreprises
- Peut supprimer n'importe quelle offre

**`ManageComplaints.jsx`**
- Toutes les réclamations avec auteur et offre concernée
- Boutons : Marquer Traitée / Rejeter

**`AdminProfile.jsx`**
- Mise à jour du profil admin (nom, prénom, téléphone)
- Avatar avec initiales

---

## 14. Workflows Métier Complets

---

### Workflow A : Connexion & Stockage du Token JWT

```
1. [Login.jsx] → utilisateur saisit email + motDePasse
2. [LoginForm submit] → dispatch(loginUser({ email, motDePasse }))
3. [authSlice] → createAsyncThunk → authService.login(credentials)
4. [authService.js] → api.post("/users/login", credentials)
5. [axiosInstance] → ajoute baseURL → POST http://localhost:5000/api/users/login
6. [user.routes.js] → loginValidator → validate → login controller
7. [user.controller.js] → loginUser(email, motDePasse)
8. [user.service.js] → findOne({email}), bcrypt.compare(), jwt.sign()
9. [Réponse] → { success: true, data: { utilisateur, token } }
10. [authService.js] → localStorage.setItem("token", token)
11. [authSlice extraReducers] → state.token = token, state.user = utilisateur
12. [AppRoutes RootRedirect] → useSelector → redirige vers /candidat/dashboard
```

---

### Workflow B : Inscription Candidat

```
1. [RegisterCandidat.jsx] → formulaire : prenom, nom, email, telephone, motDePasse, role="Candidat"
2. → dispatch(registerUser(formData))
3. → authService.register(formData) → POST /api/users/register
4. [user.routes.js] → registerValidator (express-validator) → validate → register
5. [user.service.js registerUser]
   a. Vérifie email unique
   b. bcrypt.hash(motDePasse, 10)
   c. User.create({ nom, prenom, email, motDePasse: hash, role: "Candidat" })
   d. jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" })
   e. Retourne { utilisateur, token }
6. [authService] → localStorage.setItem("token", token)
7. [authSlice] → state mis à jour
8. → Redirection automatique vers /candidat/dashboard
```

---

### Workflow C : Publication d'une Offre par l'Entreprise

```
1. [CreateEditJob.jsx] → formulaire complet rempli
2. → dispatch(createJob(formData))
3. → offreService.createJob(formData) → POST /api/jobs
4. [axiosInstance] → ajoute Authorization: Bearer TOKEN
5. [job.routes.js]
   → authentificationCheck (vérifie JWT)
   → authorizationCheck("AdministrateurEntreprise") (vérifie rôle)
   → createJobValidator + validate (vérifie les champs)
   → createJob controller
6. [job.services.js createJobService]
   → Job.create({ ...jobData, entreprise: req.user.id })
7. [Réponse] → { success: true, data: job }
8. [offreSlice] → jobs.unshift(newJob) → liste mise à jour
9. → Navigation vers /entreprise/jobs
```

---

### Workflow D : Recherche & Sauvegarde des Offres

```
RECHERCHE :
1. [JobList.jsx] → utilisateur tape un mot-clé ou sélectionne un filtre
2. → dispatch(fetchJobs({ keyword, ville, domaine, typeContrat }))
3. → GET /api/jobs?keyword=react&ville=casablanca
4. [job.services.js getAllJobsService]
   → Construit query dynamique avec $regex pour les textes
   → Job.find(query).populate("entreprise").sort({ createdAt: -1 })
5. → Affichage de la liste filtrée

SAUVEGARDE :
1. [Bouton "Sauvegarder"] → dispatch(toggleSavedJob(jobId))
2. → POST /api/saved-jobs/toggle { jobId }
3. [savedJob.service.js toggleSaveJobService]
   → Cherche si SavedJob existe pour (candidat, job)
   → Si existe → supprime (retirer des favoris)
   → Si n'existe pas → crée (ajouter aux favoris)
4. → Réponse : { saved: true/false, message }
5. → [candidatureSlice] met à jour savedJobs
```

---

### Workflow E : Postulation à une Offre

```
1. [JobDetails.jsx] → Modal de postulation → CV URL + lettre motivation
2. → dispatch(applyToJob({ jobId, applicationData: { cv, lettreMotivation } }))
3. → POST /api/applications/apply/:jobId
4. [application.routes.js]
   → authentificationCheck
   → authorizationCheck("Candidat")
   → checkJobIsAvailable :
      ✓ offre existe ?
      ✓ statut === "Ouverte" ?
      ✓ dateLimite non dépassée ?
   → applyToJob controller
5. [application.service.js createCandidatureService]
   → Vérifie CV fourni
   → Application.create({ candidat, job, cv, lettreMotivation })
   → L'index unique empêche la double candidature (MongoDB error si doublon)
6. → { success: true, data: application }
7. → [candidatureSlice] myApplications.unshift(newApp)
8. → Bouton "Postuler" devient "Déjà postulé" (grisé)
```

---

### Workflow F : Changement de Statut & Notification

```
1. [CandidateApplications.jsx] → Entreprise clique "Accepter" sur une candidature
2. → dispatch(updateApplicationStatus({ applicationId, statut: "Acceptée" }))
3. → PATCH /api/applications/:id/status { statut: "Acceptée" }
4. [application.routes.js] → auth → authorizationCheck("AdministrateurEntreprise")
5. [application.service.js updateApplicationStatusService]
   a. Application.findById() + populate("job")
   b. Vérifie que l'entreprise est propriétaire de l'offre
   c. application.statut = "Acceptée"
   d. application.save()
   e. createNotificationService(
        application.candidat,          // destinataire
        "Mise à jour de votre candidature",
        `Votre candidature pour ${job.titre} a été passée au statut : Acceptée`,
        "Candidature"
      )
6. → Notification créée en BDD pour le candidat
7. [Côté candidat — Header.jsx]
   → fetchMyNotifications() déclenché au montage
   → unreadCount > 0 → pastille rouge sur la cloche
   → Candidat clique → voit "Mise à jour de votre candidature"
```

---

### Workflow G : Système de Notifications

```
Création (Backend) :
  updateApplicationStatusService() → createNotificationService() → Notification.create()

Affichage (Frontend) :
1. [LayoutShell] monte → dispatch(fetchMyNotifications())
2. → GET /api/notification/my-notifications (avec token)
3. [notification.service.js] → Notification.find({ destinataire: userId }).sort(-createdAt)
4. [notificationSlice] → notifications = [...], unreadCount = notifs.filter(n => !n.lu).length
5. [Header.jsx] → useSelector → { notifications, unreadCount }
6. → {unreadCount > 0} → badge rouge sur la cloche

Marquer comme lu :
1. Clic sur une notif → handleNotificationClick(notif)
2. Si !notif.lu → dispatch(markNotificationAsRead(notif._id))
3. → PATCH /api/notification/:id/read
4. [notification.service.js] → notification.lu = true, save()
5. [notificationSlice] → met à jour la notif dans le tableau, décrémente unreadCount
6. → Redirection vers notif.lien (si défini) ou dashboard par défaut
```

---

### Workflow H : Réclamation & Modération Admin

```
Soumission (Candidat) :
1. [Complaints.jsx] ou [JobDetails.jsx] → formulaire motif + description + jobId
2. → dispatch(createReclamation({ jobId, motif, description }))
3. → POST /api/reclamation (auth requis)
4. [reclamation.controller.js createReclamation]
   → Vérifie que l'offre existe (Job.findById)
   → Reclamation.create({ auteur: req.user.id, job: jobId, motif, description })
5. → { success: true, data: reclamation }

Modération (Admin) :
1. [ManageComplaints.jsx] → dispatch(fetchAllReclamations())
2. → GET /api/reclamation (admin only)
3. → Liste toutes les réclamations avec auteur + offre (populate)
4. Admin clique "Traiter" → dispatch(updateReclamationStatus({ reclamationId, statut: "Traitée" }))
5. → PATCH /api/reclamation/:id/status (admin only)
6. → reclamation.statut = "Traitée", save()
7. → Liste mise à jour
```

---

## 15. Sécurité & JWT

### Comment fonctionne JWT dans SkillBridge

#### 1. Création du token (à l'inscription/connexion)
```js
const token = jwt.sign(
  { id: utilisateur._id, role: utilisateur.role },  // payload
  process.env.JWT_SECRET,                            // clé secrète
  { expiresIn: "1d" }                                // expire dans 1 jour
)
```

#### 2. Stockage
- Côté frontend : `localStorage.setItem("token", token)`
- Le token persiste entre les rechargements de page

#### 3. Envoi avec chaque requête
```js
// axiosInstance.js — intercepteur automatique
config.headers.Authorization = `Bearer ${token}`;
```

#### 4. Vérification (authentication.middleware.js)
```js
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// decoded = { id: "...", role: "Candidat", iat: ..., exp: ... }
req.user = decoded
```

#### 5. Structure d'un token JWT
Un token JWT est composé de 3 parties séparées par des points :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← Header (algorithme)
.eyJpZCI6IjY2YjEyMzQ1IiwicmkiOiJDYW5kaWRhdCIsImVhcCI6MTcwMH0    ← Payload (données)
.HMACSHA256_SIGNATURE    ← Signature (vérifiée avec JWT_SECRET)
```

### Hashage des mots de passe avec bcryptjs
```js
// Lors de l'inscription
const hash = await bcrypt.hash(motDePasse, 10)
// 10 = "salt rounds" — plus c'est élevé, plus c'est sécurisé (mais lent)

// Lors de la connexion
const isValid = await bcrypt.compare(motDePasse, hashStockéEnBDD)
```

#### 🎤 Jury — Sécurité
> "On utilise JWT pour l'authentification sans session serveur. Le token est signé avec une clé secrète stockée dans le `.env`. À chaque requête protégée, le middleware vérifie la signature du token. Les mots de passe sont hashés avec bcrypt — on ne peut pas retrouver le mot de passe original depuis le hash."

---

## 16. Gestion des Erreurs

### Backend — Format de réponse cohérent

Toutes les réponses suivent le même format :
```js
// Succès
{ success: true, message: "...", data: {...} }
// Erreur
{ success: false, message: "description de l'erreur" }
```

#### Codes HTTP utilisés
| Code | Signification | Quand |
|------|--------------|-------|
| 200 | OK | Requête réussie |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Données invalides |
| 401 | Unauthorized | Pas de token ou token invalide |
| 403 | Forbidden | Token valide mais pas les droits |
| 404 | Not Found | Ressource inexistante |
| 500 | Internal Error | Erreur serveur inattendue |

### Frontend — Gestion des erreurs Redux

Chaque slice a un état `error` :
```js
.addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;  // message d'erreur du backend
})
```

Dans les pages :
```jsx
{error && (
  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl">
    {error}
  </div>
)}
```

### `rejectWithValue` — Comment l'erreur remonte

```js
// Dans le thunk
} catch (error) {
  return rejectWithValue(
    error.response?.data?.message || "Erreur générique"
  )
}
```
- `error.response?.data?.message` → récupère le message d'erreur du backend
- Si absent → message générique de secours

---

## 17. Guide de Soutenance — Questions Fréquentes du Jury

---

### Q1 : Pouvez-vous m'expliquer l'architecture de votre projet ?

> "Notre projet SkillBridge suit l'architecture MERN : MongoDB pour la base de données, Express.js pour l'API REST côté serveur, React pour l'interface utilisateur, et Node.js comme environnement d'exécution. Le frontend et le backend sont complètement séparés et communiquent via des appels HTTP. Le backend expose une API RESTful, et le frontend React consomme cette API via Axios."

---

### Q2 : Comment gérez-vous l'authentification ?

> "On utilise JWT — JSON Web Token. Quand un utilisateur se connecte, le backend génère un token signé avec une clé secrète et l'envoie au frontend. Le frontend le stocke dans le localStorage et l'envoie dans l'en-tête Authorization de chaque requête. Côté backend, un middleware vérifie la signature du token à chaque requête protégée. Les mots de passe sont toujours stockés hashés avec bcrypt."

---

### Q3 : Comment gérez-vous les rôles et les droits ?

> "On a 3 rôles : Candidat, AdministrateurEntreprise, et Administrateur. Côté backend, chaque route protégée passe d'abord par `authentificationCheck` qui vérifie le JWT, puis par `authorizationCheck` qui vérifie si le rôle de l'utilisateur est dans la liste des rôles autorisés. Côté frontend, `ProtectedRoute` empêche un utilisateur d'accéder aux pages d'un autre rôle et le redirige vers son propre dashboard."

---

### Q4 : Expliquez-moi le flux d'une postulation.

> "Quand un candidat clique 'Postuler', React dispatche une action Redux `applyToJob`. Le thunk Redux appelle `candidatureService.applyToJob()` qui fait un POST via Axios vers `/api/applications/apply/:jobId`. Côté backend, la requête passe par 3 middlewares : vérification du JWT, vérification du rôle Candidat, et vérification que l'offre est ouverte et dans les délais. Le service crée alors la candidature en MongoDB. Un index unique sur la paire candidat+job empêche la double candidature. La réponse remonte vers Redux, qui met à jour l'état, et le bouton Postuler devient grisé."

---

### Q5 : Comment fonctionnent les notifications ?

> "Les notifications sont créées automatiquement par le backend. Par exemple, quand l'entreprise change le statut d'une candidature, le service d'application appelle `createNotificationService()` qui enregistre une notification en MongoDB pour le candidat. Côté frontend, le Header récupère les notifications au montage de l'application. Le nombre de non-lues est calculé et affiché comme un badge rouge sur l'icône cloche. Quand le candidat clique sur une notification, elle est marquée comme lue via un appel API."

---

### Q6 : Pourquoi avoir utilisé Redux ?

> "Redux Toolkit centralise l'état global de l'application. Par exemple, les informations de l'utilisateur connecté (nom, rôle) sont lues dans le Header, la Sidebar, les pages profil, etc. Sans Redux, il faudrait faire des 'props drilling' extrêmement profonds ou répéter des appels API. Avec Redux, les données sont dans un store unique et accessibles partout avec `useSelector`. Les `createAsyncThunk` gèrent automatiquement les états pending/fulfilled/rejected des appels API."

---

### Q7 : Comment sécurisez-vous vos routes API ?

> "Chaque route sensible a au minimum deux couches de protection : l'authentification JWT et la vérification des rôles. De plus, pour des opérations spécifiques, on a des middlewares supplémentaires — par exemple `checkJobOwnership` vérifie qu'une entreprise ne peut modifier que ses propres offres, et `checkJobIsAvailable` vérifie qu'une offre est ouverte avant de permettre une postulation. Les données entrantes sont validées avec express-validator avant même d'atteindre le contrôleur."

---

### Q8 : Quelle est la différence entre Controller et Service ?

> "Le contrôleur reçoit la requête HTTP, appelle le service approprié, et retourne la réponse JSON. Il gère le try/catch et les codes HTTP. Le service contient la vraie logique métier : les requêtes Mongoose, les transformations de données, les opérations complexes. Cette séparation rend le code plus lisible, testable, et maintenable. Par exemple, le service `updateApplicationStatusService` gère en une seule fonction la mise à jour du statut ET la création de la notification."

---

### Q9 : Comment avez-vous géré les tests ?

> "On a 4 suites de tests avec Jest et Supertest, utilisant mongodb-memory-server pour lancer une vraie instance MongoDB en RAM. On teste les routes d'authentification, la gestion des offres, les candidatures, et les réclamations. Chaque test crée ses données, exécute l'action, et vérifie la réponse. Les 4 suites passent avec 10 tests réussis."

---

### Q10 : Si vous deviez refaire le projet, que changeriez-vous ?

> "On pourrait améliorer plusieurs points : stocker le token JWT dans un cookie HttpOnly plutôt que le localStorage pour plus de sécurité. Ajouter un système de refresh token. Implémenter des WebSockets pour les notifications en temps réel sans polling. Ajouter de la pagination côté serveur pour les grandes listes. Et peut-être séparer davantage le frontend en features encore plus indépendantes."

---

*Fin du document — Bonne soutenance ! 🚀*
