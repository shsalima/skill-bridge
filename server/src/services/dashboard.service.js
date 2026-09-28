import Application from "../models/Application.js"
import Job from "../models/Job.js"
import User from "../models/User.js"

export const getEntrepriseDashboardService= async(entrepriseId)=>{
    const totalJobs= await Job.countDocuments({entreprise:entrepriseId})

    const  entrepriseJobs=await Job.find({entreprise:entrepriseId}).select("_id")
    const jobIds=entrepriseJobs.map((j)=>j._id)
    const totalApplications= await Application.countDocuments({job: {$in:jobIds}})

    const applicationsStatus=await Application.aggregate([
        {$match:{job:{$in:jobIds}}},
        {$group :{_id:"$statut" ,count: {$sum :1}}}
    ])

    return {totalJobs, totalApplications,statusBreakdown: applicationsStatus}
}

export const getAdminDashboardService =async ()=>{
    const totalUser=await User.countDocuments()
    const totalCandidats=await User.countDocuments({role:"Candidat"})
    const totalEntreprise=await User.countDocuments({role:"AdministrateurEntreprise"})
    const totalJobs=await Job.countDocuments()
    const totalApplications=await Application.countDocuments()

    return {totalUser, totalCandidats,totalEntreprise,totalJobs, totalApplications}

}