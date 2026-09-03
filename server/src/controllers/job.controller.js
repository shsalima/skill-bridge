import { createJobService, deleteJobService, getAllJobsService, getJobByIdServices, updateJobService } from "../services/job.services.js"


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

export const getAllJobs= async(req,res)=>{
    try{
        const jobs=await getAllJobsService(req.query)
        return res.status(200).json({
            success:true,
            count:jobs.length,
            data:jobs
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const getJobById =async(req,res)=>{
    try{
        const job=await getJobByIdServices(req.params.id)
        return res.status(200).json({
            success:true,
            data:job
        })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:error.message
        })
    }
}



export const updateJob= async(req,res)=>{
    try{
        const updateJob=await updateJobService(req.params.id,req.body)
        return res.status(200).json({
            success:true,
            message:"L'affichage a été modifié avec succès.",
            data:updateJob
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}



export const deleteJob =async (req,res)=>{
    try{
        await deleteJobService(req.params.id)
        return res.status(200).json({
            success:true,
            message:"L'offre a été supprimée avec succès."
        })
    }catch(error){
        return res.status(400).json({
            success:true,
            message:error.message
        })
    }
}