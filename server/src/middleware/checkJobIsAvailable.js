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
            res.status(403).json({
                success:false,
                message:"Cette offre est fermée et n'accepte plus de candidatures"
            })
        }
        if(job.dateLimite && new Date(job.dateLimite) < new Date()){
            return res.status(403).json({
                success:false,
                message:"La date limite de cette offre est dépassée"
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