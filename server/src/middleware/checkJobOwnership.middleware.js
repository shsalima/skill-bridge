import Job from "../models/Job.js"


export const checkJobOwnership= async (req,res,next)=>{
    try{
        const jobId=req.params.id
        const userId=req.user.id
        const userRole= req.user.role


        const job=await Job.findById(jobId)

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Aucune offre d'emploi disponible"
            })    
        }

        if(job.entreprise.toString() !== userId && userRole  !=="Administrateur"){
            return res.status(403).json({
               success: false,
               message: "Vous n'êtes pas autorisé à modifier ou à supprimer cette offre."
            });
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
