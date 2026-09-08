import Job from "../models/Job"
import Reclamation from "../models/Reclamation"


export const createReclamationService= async (userId,jobId,motif,description)=>{
    const jobExists=await Job.findById(jobId)

    if(!jobExists){
        throw new Error("Offre non trouvée")
    }

    return await Reclamation.create({
        auteur:userId,
        job:jobId,
        motif,
        description
    })
}