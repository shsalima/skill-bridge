import { getUserNotificationService } from "../services/notification.service.js"


export const getMyNotifications = async(req,res)=>{
    try{
        const notifactions=await getUserNotificationService(req.user.id)
        return res.status(200).json({
            success:true,
            count:notifactions.length,
            data:notifactions
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}