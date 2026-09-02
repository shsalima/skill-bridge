import Job from "../models/Job"

export const createJobService= async (jobData,entrepriseId)=>{
    const newJob= await Job.create({
        ...jobData?
        entreprise:entrepriseId
    })
    return newJob

}