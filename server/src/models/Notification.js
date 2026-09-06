import mongoose from "mongoose";



const notificationSchema=new mongoose.Schema(
    {
        destinataire:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        titre:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        lu:{
            type:Boolean,
            default:false,
        },
        type:{
            type:String,
            enum:["Candidature", "Offre", "Systeme"],
            default:"Candidature",
        }
    },
    {timestamps:true}
)

export default mongoose.model("Notification",notificationSchema)