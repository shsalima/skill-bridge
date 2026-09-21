import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Entreprise from "../models/Entreprise.js";
import Competence from "../models/Competence.js";


export const registerUser = async (userData) => {
  const { prenom, nom, email, motDePasse, telephone, role, nomEntreprise } = userData;

  const utilisateurExiste = await User.findOne({ email });
  if (utilisateurExiste) {
    throw new Error("Cette adresse mail est déjà utilisée");
  }

  const normalizedRole = role === "Entreprise" ? "AdministrateurEntreprise" : (role || "Candidat");
  const motDePasseChifre = await bcrypt.hash(motDePasse, 10);

  const utilisateur = await User.create({
    nom: nom ,
    prenom: prenom ,
    email,
    telephone,
    motDePasse: motDePasseChifre,
    role: normalizedRole,
  });

  if (normalizedRole === "AdministrateurEntreprise") {
    await Entreprise.create({
      user: utilisateur._id,
      nomEntreprise: nomEntreprise || "Nouvelle Entreprise",
    });
  }
   const token =jwt.sign(
    {id:utilisateur._id,role:utilisateur.role},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )

  const userObj = utilisateur.toObject();
  delete userObj.motDePasse;

   return {
    utilisateur: userObj,
    token
  }
};




export const loginUser = async (email, motDePasse) => {
  if (!email || !motDePasse) {
    throw new Error("Email et mot de passe requis");
  }

  const cleanEmail = email.trim();

  const utilisateur = await User.findOne({
    email: { $regex: new RegExp(`^${cleanEmail}$`, "i") }
  }).select("+motDePasse +password");

  if (!utilisateur) {
    throw new Error("email incorrect ");
  }

  const hashedPassword = utilisateur.motDePasse || utilisateur.password;

  if (!hashedPassword) {
    throw new Error("Mot de passe non configuré ou introuvable pour cet utilisateur");
  }

  const motDePasseCorrect = await bcrypt.compare(String(motDePasse), String(hashedPassword));

  if (!motDePasseCorrect) {
    throw new Error("mot de passe incorrect");
  }

  const userObj = utilisateur.toObject();
  delete userObj.motDePasse;
  delete userObj.password;

  if (utilisateur.role === "Candidat") {
    const comp = await Competence.findOne({ candidat: utilisateur._id });
    userObj.competences = comp ? comp.competences : [];
  } else if (utilisateur.role === "AdministrateurEntreprise") {
    const ent = await Entreprise.findOne({ user: utilisateur._id });
    userObj.entreprise = ent || null;
    if (ent?.nomEntreprise) {
      userObj.nomEntreprise = ent.nomEntreprise;
    }
  }

  const token = jwt.sign(
    { id: utilisateur._id, role: utilisateur.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    utilisateur: userObj,
    token
  };
};



export const getUserProfileService=async (userId)=>{
  const user= await User.findById(userId).select("-motDePasse").lean()
  if(!user){
    throw new Error("Utilisateur introuvable")
  }

  if (user.role === "Candidat") {
    const comp = await Competence.findOne({ candidat: userId });
    user.competences = comp ? comp.competences : [];
  } else if (user.role === "AdministrateurEntreprise") {
    const ent = await Entreprise.findOne({ user: userId });
    user.entreprise = ent || null;
  }

  return user
}


export const updateUserProfileService= async (userId,updateData)=>{
  const { competences, nomEntreprise, description, adresse, ville, siteWeb, logo, ...userData } = updateData;

  const updateUser= await User.findByIdAndUpdate(
    userId,
    {$set:userData},
    {new: true,runValidators:true}
  ).select("-motDePasse").lean()

  if(!updateUser){
    throw new Error("Utilisateur introuvable")
  }

  if (competences && Array.isArray(competences)) {
    const comp = await Competence.findOneAndUpdate(
      { candidat: userId },
      { $set: { competences, candidat: userId } },
      { upsert: true, new: true }
    );
    updateUser.competences = comp.competences;
  } else if (updateUser.role === "Candidat") {
    const comp = await Competence.findOne({ candidat: userId });
    updateUser.competences = comp ? comp.competences : [];
  }

  if (updateUser.role === "AdministrateurEntreprise") {
    const entUpdate = {};
    if (nomEntreprise !== undefined) entUpdate.nomEntreprise = nomEntreprise;
    if (description !== undefined) entUpdate.description = description;
    if (adresse !== undefined) entUpdate.adresse = adresse;
    if (ville !== undefined) entUpdate.ville = ville;
    if (siteWeb !== undefined) entUpdate.siteWeb = siteWeb;
    if (logo !== undefined) entUpdate.logo = logo;

    if (Object.keys(entUpdate).length > 0) {
      const ent = await Entreprise.findOneAndUpdate(
        { user: userId },
        { $set: entUpdate },
        { upsert: true, new: true }
      );
      updateUser.entreprise = ent;
    } else {
      const ent = await Entreprise.findOne({ user: userId });
      updateUser.entreprise = ent;
    }
  }

  return updateUser
}

export const getAllUsersService = async () => {
  return await User.find().select("-motDePasse").sort({ createdAt: -1 });
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }
  await User.findByIdAndDelete(userId);
  await Entreprise.findOneAndDelete({ user: userId });
  await Competence.findOneAndDelete({ candidat: userId });
  return true;
};

export const getAllCompaniesService = async () => {
  return await Entreprise.find()
    .populate("user", "nom prenom email telephone")
    .sort({ createdAt: -1 });
};

export const toggleBlockCompanyService = async (companyId) => {
  const comp = await Entreprise.findById(companyId);
  if (!comp) {
    throw new Error("Entreprise introuvable");
  }
  comp.estBloquee = !comp.estBloquee;
  await comp.save();
  return comp;
};
