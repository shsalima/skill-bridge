import Job from "../models/Job.js"

export const createJobService= async (jobData,entrepriseId)=>{
    const newJob= await Job.create({
        ...jobData,
        entreprise:entrepriseId
    })
    return newJob

}


export const getAllJobsService =async (filters)=>{
    const query={statut:"Ouverte"}

    if(filters.keyword){
        query.$or=[
            {tittre:{ $regex:filters.keyword,$options:"i"}},
            {description:{$regex: filters.keyword, $options:"i"}}
        ]
    }
    if(filters.ville){
        query.ville={$regex:filters.ville, $options:"i"}
    }
    if(filters.domaine){
        query.domaine={$regex:filters.domaine,$options:"i"}
    }
    if(filters.typeContrat){
        query.typeContrat=filters.typeContrat
    }

    const jobs=await Job.find(query)
        .populate("entreprise", "nom prenom email photo telephone")
        .sort({createdAt: -1})
    return jobs

}


export const getJobByIdServices =async (jobId)=>{
    const job=await Job.findById(jobId).populate(
        "entreprise",
        "nom prenom email photo telephone"
    )
    
    if(!job){
        throw new Error("Aucune offre d'emploi disponible")
    }
    return job
}