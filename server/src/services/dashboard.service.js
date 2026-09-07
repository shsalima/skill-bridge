import Application from "../models/Application"
import Job from "../models/Job."

    // Dashboard Stats for Enterprise Owner
export const getEntrepriseDashboardService= async(entrepriseId)=>{
    // les offre de cette entre
    const totalJobs= await Job.countDocuments({entreprise:entrepriseId})

    // aff toute id des offre de cette entre
    const  entrepriseJobs=await Job.find({entreprise:entrepriseId}).select("_id")
    const jobIds=entrepriseJobs.map((j)=>j._id)
    // total de toute les applications de offre d'entreprise
    const totalApplications= await Application.countDocuments({job: {$in:jobIds}})

    // kanwaz3o les rreq 3la 7ssab etat
    const applicationsStatus=await Application.aggregate([
        {$match:{job:{$in:jobIds}}},
        {$group :{_id:"$statut" ,count: {$sum :1}}}
    ])

    return {
        totalJobs,
        totalApplications,
        statusBreakdown: applicationsStatus
    }
}