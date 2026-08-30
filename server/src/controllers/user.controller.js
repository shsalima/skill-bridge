import { registerUser } from "../services/user.service.js"


export const register = async(req,res)=>{
    try{
        const utilisateur= await registerUser(req.body)

        return res.status(201).json({
            success: true,
            message:" utilisateur crée avec succés",
            data :utilisateur
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message : error.message

        })
    }
}