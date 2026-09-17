import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Entreprise from "../models/Entreprise.js";


export const registerUser = async (userData) => {
  const { prenom, nom, email, motDePasse, telephone, role, nomEntreprise } = userData;

  const utilisateurExiste = await User.findOne({ email });
  if (utilisateurExiste) {
    throw new Error("Cette adresse mail est déjà utilisée");
  }

  const motDePasseChifre = await bcrypt.hash(motDePasse, 10);

  const utilisateur = await User.create({
    nom: nom ,
    prenom: prenom ,
    email,
    telephone,
    motDePasse: motDePasseChifre,
    role: role || "Candidat",
  });

  if (role === "AdministrateurEntreprise") {
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

   return {
    utilisateur,
    token
  }
};




export const loginUser= async(email, motDePasse)=>{

  const utilisateur=await User.findOne({email}).select("-motDePasse")

  if(!utilisateur){
    throw new Error("email incorrect ")

  }
  const motDePasseCorrect=await bcrypt.compare(motDePasse,utilisateur.motDePasse)

  if(!motDePasseCorrect){
    throw new Error("mot de passe incorrect")
  }

  const token =jwt.sign(
    {id:utilisateur._id,role:utilisateur.role},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )
  return {
    utilisateur,
    token
  }

}



export const getUserProfileService=async (userId)=>{
  const user= await User.findById(userId).select("-motDePasse")
  if(!user){
    throw new Error("Utilisateur introuvable")
  }
  return user
}


export const updateUserProfileService= async (userId,updateData)=>{

  const updateUser= await User.findByIdAndUpdate(
    userId,
    {$set:updateData},
    {new: true,runValidators:true}
  ).select("-motDePasse")

  if(!updateUser){
    throw new Error("Utilisateur introuvable")

  }
  return updateUser
}
