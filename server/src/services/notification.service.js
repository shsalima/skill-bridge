import Notification from "../models/Notification"


export const createNotificationService= async(destinataireId,titre,message,type="Candidature")=>{
    return await Notification.create({
        destinataire:destinataireId,
        titre,
        message,
        type
    })
}