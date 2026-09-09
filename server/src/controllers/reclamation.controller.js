import { createReclamationService, getAllReclamationService } from "../services/reclamation.service.js"

  

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


  export const getAllReclamation=async (req,res)=>{
    try{
        const reclamation=await getAllReclamationService()
        return res.status(200).json({
            success:true,
            count:reclamation.length,
            data:reclamation
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

  }


  export const updateReclamationStatus=async(req,res)=>{
    try{
        const {statut}=req.body
        const reclamation=await updateReclamationStatusService(req.params.id,statut)
        return res.status(200).json({
            success:true,
            message:"Statut de la réclamation mis à jour avec succès",
            data:reclamation
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
  }