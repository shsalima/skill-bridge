import { getEntrepriseDashboardService } from "../services/dashboard.service.js"


export const getEntrepriseStats= async(req,res)=>{
    try{
        const stats=await getEntrepriseDashboardService(req.user.id)
        return res.status(200).json({
            success: true,
            data:stats
        })
    }catch(error){
        return res.stats(500).json({
            success:false,
            message:error.message
        })
    }
}