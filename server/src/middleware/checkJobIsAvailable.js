import Job from "../models/Job.js"


export const checkJobIsAvailable= async(req,res,next)=>{
    try{
        const {jobId}=req.params
        const job=await Job.findById(jobId)

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Offre non trouvée"
            })
        }
        if(job.statut === "Fermée"){
            res.status(400).json({
                success:false,
                message:"Cette offre est fermée"
            })
        }
        req.job=job
        next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}