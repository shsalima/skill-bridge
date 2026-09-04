import { createCandidatureService, getApplicationsByJobService, getMyApplicationsService } from "../services/application.service.js"


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


export const getMyApplications=async(req,res)=>{
    try{
        const applications= await getMyApplicationsService(req.user.id)
        return res.status(200).json({
            success:true,
            count: applications.length,
            data:applications,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



export const getApplicationsByJob=async(req,res)=>{
    try{
        const applications=await getApplicationsByJobService(
            req.params.jobId,
            req.user.id
        )
        return res.status(200).json({
            success:true,
            count:applications.length,
            data:applications
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}