# 🚀 SkillBridge - Plateforme Intelligente de Recrutement & Smart Matching

SkillBridge est une application web Full Stack basée sur l'architecture **MERN** (MongoDB, Express.js, React.js, Node.js). Elle simplifie la mise en relation entre les chercheurs d'emploi/stage et les recruteurs grâce à un système intelligent de correspondance de compétences (**Smart Matching**), la gestion des candidatures en temps réel et un suivi fluide par rôle.

---

## 📋 Sommaire
1. [Aperçu & Présentation](#-aperçu--présentation)
2. [Fonctionnalités Clés par Rôle](#-fonctionnalités-clés-par-rôle)
3. [Architecture & Diagrammes UML](#-architecture--diagrammes-uml)
4. [Stack Technique](#-stack-technique)
5. [Arborescence du Projet](#-arborescence-du-projet)
6. [Prérequis Système](#-prérequis-système)
7. [Guide d'Installation Étape par Étape](#-guide-dinstallation-étape-par-étape)
8. [Configuration des Variables d'Environnement (.env)](#-configuration-des-variables-denvironnement-env)
9. [Lancement de l'Application](#-lancement-de-lapplication)
10. [Utilisation & Guide Pas à Pas](#-utilisation--guide-pas-à-pas)
11. [Conteneurisation avec Docker](#-conteneurisation-avec-docker)
12. [EndPoints API Principaux](#-endpoints-api-principaux)
13. [Auteur & Mentions](#-auteur--mentions)

---

## 🎯 Aperçu & Présentation
- **Nom du Projet :** SkillBridge
- **Établissement :** École Numérique Ahmed El Hansali
- **Développé par :** Salima Sahi
- **Encadré par :** Sine Oussama
- **Année Académique :** 2025 – 2026
- **Stack :** MongoDB, Express.js, React.js (Tailwind CSS, Redux Toolkit), Node.js

---

## 🔑 Fonctionnalités Clés par Rôle

### 👨‍🎓 1. Candidat
- **Création de profil complet :** Coordonnées, photo, compétences, diplômes/formations, et upload du CV (PDF/Docx).
- **Recherche & Filtrage :** Filtres par mots-clés, ville, type de contrat (CDI, Stage, Freelance), domaine et salaire.
- **Smart Matching (IA/Algorithme) :** Analyse instantanée du taux de compatibilité (%) entre le profil et l'offre postulée, avec détails des compétences validées et à acquérir.
- **Offres Enregistrées :** Possibilité de sauvegarder des offres pour postuler ultérieurement.
- **Suivi des candidatures :** Statuts en temps réel (En attente, Accepté, Refusé) avec accès aux détails.
- **Système de Réclamation :** Signalement d'entreprises ou d'offres frauduleuses.

### 🏢 2. Administrateur Entreprise
- **Gestion du profil entreprise :** Présentation, logo, coordonnées et domaine.
- **Gestion des offres :** Publication, modification, suspension et suppression d'offres de recrutement.
- **Gestion des candidatures reçues :** Consultation des profils, téléchargement du CV du candidat et classement par compatibilité.
- **Décisions de recrutement :** Acceptance ou refus individuel ou en masse avec envoi de messages (convocation entretien, motif de refus).

### 🛡️ 3. Administrateur Plateforme
- **Tableau de bord statistique :** Indicateurs globaux (Nombre d'utilisateurs, d'entreprises, d'offres et de candidatures).
- **Modération & Gestion :** Activation, blocage ou suppression des comptes utilisateurs et entreprises.
- **Traitement des réclamations :** Traitement des plaintes déposées par les candidats.

---

## 📐 Architecture & Diagrammes UML

<!-- =================================================== -->
<!-- TODO: AJOUTER L'IMAGE DU DIAGRAMME DE CAS D'UTILISATION (USE CASE) -->
<!-- ![Diagramme de Cas d'Utilisation](./docs/diagrams/use-case.png) -->
<!-- =================================================== -->

<!-- =================================================== -->
<!-- TODO: AJOUTER L'IMAGE DU DIAGRAMME DE CLASSES (CLASS DIAGRAM) -->
<!-- ![Diagramme de Classes](./docs/diagrams/class-diagram.png) -->
<!-- =================================================== -->

<!-- =================================================== -->
<!-- TODO: AJOUTER L'IMAGE DU DIAGRAMME DE SÉQUENCE (SEQUENCE DIAGRAM) -->
<!-- ![Diagramme de Séquence](./docs/diagrams/sequence-diagram.png) -->
<!-- =================================================== -->

---

## 🛠️ Stack Technique

* **Frontend :** React.js (Vite/CRA), Redux Toolkit (State Management), Tailwind CSS (UI/Design Dark Theme), Axios, Lucide-React (Icons).
* **Backend :** Node.js, Express.js, express-validator (Validation des inputs), JWT (JSON Web Tokens), bcryptjs (Chiffrement des mots de passe).
* **Base de Données :** MongoDB, Mongoose ODM.
* **DevOps & Outils :** Docker & Docker Compose, Postman (Documentation API), Git/GitHub.

---

## 📁 Arborescence du Projet

```text
SkillBridge/
├── backend/ (ou server/)
│   ├── config/            # Configuration BD & variables
│   ├── controllers/       # Logique métier des routes
│   ├── middleware/        # Authentication JWT & Validation express-validator
│   ├── models/            # Modèles Mongoose (User, Job, Application, Complaint...)
│   ├── routes/            # Définition des endpoints API
│   ├── uploads/           # Stockage des fichiers (CVs, images)
│   ├── .env.example       # Modèle de variables d'environnement
│   ├── Dockerfile         # Dockerfile Backend
│   └── server.js          # Point d'entrée du serveur Node.js
├── frontend/ (ou client/)
│   ├── public/
│   ├── src/
│   │   ├── app/           # Configuration Redux Store
│   │   ├── features/      # Slices Redux (authSlice, jobSlice, notificationSlice...)
│   │   ├── components/    # Composants Réutilisables (Sidebar, Header Dropdown, Cards)
│   │   ├── pages/         # Vues séparées par rôle (candidat/, entreprise/, admin/)
│   │   ├── App.jsx        # Routing principal & Protection des routes
│   │   └── main.jsx
│   ├── Dockerfile         # Dockerfile Frontend
│   └── tailwind.config.js
├── docker-compose.yml     # Orchestration Docker
└── README.md
```

---

## 💻 6. Prérequis Système
Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :
- **Node.js** (v18 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **MongoDB** (Local ou MongoDB Atlas) : [Télécharger MongoDB](https://www.mongodb.com/)
- **Git** : [Télécharger Git](https://git-scm.com/)

---

## 📥 7. Guide d'Installation Étape par Étape

1. **Cloner le dépôt sur votre machine locale :**
   ```bash
   git clone https://github.com/votre-utilisateur/skillbridge.git
   cd skillbridge
   ```

2. **Installer les dépendances du Backend :**
   ```bash
   cd server   # ou cd backend
   npm install
   ```

3. **Installer les dépendances du Frontend :**
   ```bash
   cd ../client  # ou cd ../frontend
   npm install
   ```

---

## ⚙️ 8. Configuration des Variables d'Environnement (.env)

Dans le dossier du **backend** (`server/`), créez un fichier nommé `.env` à partir de `.env.example` (ou créez-le manuellement) et ajoutez-y les variables suivantes :

```env
# Port d'écoute du serveur Node.js
PORT=5000

# URI de connexion à la base de données MongoDB
MONGO_URI=mongodb://localhost:27017/skillbridge

# Clé secrète JWT pour la signature des tokens (à personnaliser)
JWT_SECRET=super_cle_secrete_jwt_skillbridge_2026
```

---

## 🚀 9. Lancement de l'Application

Vous devez démarrer le serveur backend et le serveur frontend dans **deux terminaux distincts**.

**Terminal 1 : Lancement du Backend**
```bash
cd server
npm start
# (Le serveur démarrera sur http://localhost:5000)
```

**Terminal 2 : Lancement du Frontend (Vite)**
```bash
cd client
npm run dev
# (L'interface web s'ouvrira sur http://localhost:5174)
```

---

## 📖 10. Utilisation & Guide Pas à Pas

1. **Inscription :** Rendez-vous sur la page d'inscription et créez un compte. Vous pouvez choisir entre le rôle **Candidat** ou **Entreprise**.
2. **Espace Candidat :** Une fois connecté, complétez votre profil en y ajoutant vos **compétences clés**. Parcourez les offres d'emploi : le système de **Smart Matching** calculera automatiquement votre pourcentage de compatibilité avec l'offre !
3. **Espace Entreprise :** Complétez les informations de votre entreprise et publiez votre première offre d'emploi. Dès qu'un candidat postule, vous recevrez une notification et pourrez visualiser son CV ainsi que son rang généré par l'IA.
4. **Espace Admin :** Connectez-vous avec un compte Administrateur pour surveiller l'activité globale et traiter d'éventuelles réclamations.

---

## 🐳 11. Conteneurisation avec Docker (Optionnel)

Si vous souhaitez déployer ou tester le projet facilement avec Docker, exécutez la commande suivante à la racine du projet (là où se trouve le fichier `docker-compose.yml`) :

```bash
docker-compose up -d --build
```
*Le système va télécharger les images nécessaires, conteneuriser le Frontend, le Backend et la Base de Données MongoDB, et lier l'ensemble du réseau automatiquement.*

---

## 🔌 12. EndPoints API Principaux

Voici un aperçu de l'architecture RESTful de l'API (disponible sur `/api`) :

- **Authentification (`/api/auth`) :**
  - `POST /register` : Créer un compte utilisateur ou entreprise
  - `POST /login` : Authentification et récupération du token JWT
- **Offres d'Emploi (`/api/jobs`) :**
  - `GET /` : Récupérer toutes les offres (avec filtres dynamiques)
  - `POST /` : Créer une offre (Réservé aux entreprises)
- **Candidatures (`/api/applications`) :**
  - `POST /:jobId/apply` : Déposer une candidature
  - `PATCH /:id/status` : Accepter ou refuser un candidat
- **Notifications (`/api/notification`) :**
  - `GET /my-notifications` : Obtenir l'historique des notifications de l'utilisateur
  - `PATCH /:id/read` : Marquer une notification spécifique comme lue

---

## 👨‍💻 13. Auteur & Mentions

- **Développé avec passion par :** Salima Sahi
- **Encadrement pédagogique :** Sine Oussama
- **Cadre de réalisation :** Projet de fin d'étude - École Numérique Ahmed El Hansali (Promotion 2025-2026)

Merci d'avoir consulté et utilisé ce projet ! N'hésitez pas à ouvrir une *Issue* si vous rencontrez le moindre bug, ou une *Pull Request* pour suggérer des améliorations. 💡
