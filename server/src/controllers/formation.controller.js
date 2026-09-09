import { createFormationService, deleteFormationService, getMyFormationsService } from "../services/formation.service"


export const  addFormation= async(req,res)=> {
    try {
        const formation =await createFormationService(req.user._id,req.body)
        res.status(201).json({
            success:true,
            message:"Formation ajoutée avec succès",
            data:formation
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



export const getMyFormations= async(req,res)=> {
    try {
        const formations =await getMyFormationsService(req.user._id)
        res.status(200).json({
            success:true,
            count:formations.length,
            data:formations
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const deleteFormation= async(req,res)=> {
    try {
        const formation =await deleteFormationService(req.params.id,req.user._id)
        res.status(200).json({
            success:true,
            message:"Formation supprimée avec succès",
            data:formation
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}