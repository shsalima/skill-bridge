import { createCandidatureService } from "../services/application.service.js"


export const applyToJob= async (req,res)=>{
    try{
        const application= await createCandidatureService(req.user.id,req.params.jobId,req.body)
        return res.status(201).json({
            success:true,
            message:"Votre candidature a bien été soumise",
            data:application
        })
    }catch(error){        
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}