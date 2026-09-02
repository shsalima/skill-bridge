import Job from "../models/Job.js"

export const createJobService= async (jobData,entrepriseId)=>{
    const newJob= await Job.create({
        ...jobData,
        entreprise:entrepriseId
    })
    return newJob

}