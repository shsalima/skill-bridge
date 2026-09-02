import { createJobService } from "../services/job.services"


export const createJob= async (req,res)=>{
    try{
        const job= await createJobService(req.body,req.user.id)
        return res.status(201).json({
            success:true,
            message:"L'offre a été publiée avec succès",
            data:job,
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}