import Notification from "../models/Notification.js"


export const createNotificationService= async(destinataireId,titre,message,type="Candidature")=>{
    return await Notification.create({
        destinataire:destinataireId,
        titre,
        message,
        type
    })
}

export const getUserNotificationService= async(userId)=>{
    return await Notification.find({
        destinataire:userId
    }).sort({createdAt:-1})
}


export const markNotificationAsReadService=async(notificationId,userId)=>{
    const notification=await Notification.findById(notificationId)
    if(!notification){
        throw new Error("Notification non trouvée")
    }

    if(notification.destinataire.toString() !== userId){
        throw new Error("Non autorisé à modifier cette notification")

    }
    notification.lu=true
    await notification.save()
    return notification
}