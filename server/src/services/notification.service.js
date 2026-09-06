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