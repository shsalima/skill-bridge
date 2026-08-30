import User from "../models/User.js"
import bcrypt from "bcryptjs"


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