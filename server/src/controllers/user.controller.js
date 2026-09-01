import { loginUser, registerUser } from "../services/user.service.js"


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

export const login = async(req,res)=>{
    try{
        const {email,motDePasse}=req.body
        const result =await loginUser(email,motDePasse)

        return res.status(200).json({
            success:true,
            message:"connexion réussie",
            data :result
        })


    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }

}

