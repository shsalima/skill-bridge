import jwt from "jsonwebtoken"
import User from "../models/User.js"

    

export const authentificationCheck=(req,res,next)=>{
    const authHeader=req.headers["authorization"]

    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"authentification required"
        })
    }

    const token=authHeader.split(" ")[1]
    try{
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user=decoded
        next()
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"token invalide ou expiré"
        })
    }
}



export const checkAdminLimit=async(req,res,next)=>{
    try{
        const {role} =req.body

        if(role === "Administrateur"){
            const existingAdmin =await User.findOne({role: "Administrateur"})

            if(existingAdmin){
                return res.status(403).json({
                    success:false,
                    message:"Impossible de créer un autre administrateur. Un administrateur existe déjà"
                })
            }
        }
        next()
    }catch(error){
        return res.status(500).json({
            success: false,
            message :"Erreur lors de la vérification du rôle administrateur",
            error:error.message
        })
    }
}