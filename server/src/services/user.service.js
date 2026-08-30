import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const registerUser= async(userData)=>{
    const {nom, prenom, email, motDePasse,telephone, photo, role, dateNaissance }=userData
     const utilisateurExiste= await User.findOne({email})

     if(utilisateurExiste){
        throw new Error("cette adresse mail est déjà utilisé")

     }

     const motDePasseChifre= await bcrypt.hash(motDePasse,10)
      const utilisateur= await User.create({
        nom,
        prenom,
        email,
        motDePasse:motDePasseChifre,
        telephone,
        photo,
        role,
        dateNaissance
      })
      return utilisateur
}

export const loginUser= async(email, motDePasse)=>{

  const utilisateur=await User.findOne({email})

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