import { createReclamationService } from "../services/reclamation.service.js"

  

  export const createReclamation=async(req,res)=>{
    try{
        const {jobId, motif, description } = req.body;
        const reclamation=await createReclamationService(req.user.id,jobId,motif,description)
        return res.status(201).json({
            success:true,
            message:"Réclamation envoyée avec succès",
            data:reclamation
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
  }