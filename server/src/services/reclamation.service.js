import Job from "../models/Job.js"
import Reclamation from "../models/Reclamation.js"


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

export const getAllReclamationService=async()=>{
    return await Reclamation.find()
    .populate("auteur","nom prenom email role")
    .populate("job","titre entreprise")
    .sort({createdAt:-1})
}