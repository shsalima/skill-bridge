import { getUserNotificationService, markNotificationAsReadService } from "../services/notification.service.js"


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


export const markAsRead=async (req,res)=>{
    try{
        const notification=await markNotificationAsReadService(req.params.id,req.user.id)
        return res.status(200).json({
            success:true,
            message:"Notification marquée comme lue",
            data:notification
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}