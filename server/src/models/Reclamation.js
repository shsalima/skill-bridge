import mongoose from "mongoose";


const reclamationSchema= new mongoose.Schema(
    {
        auteur:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        job:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job",
            required:true,
        },
        motif:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        statut:{
            type:String,
            enum:["En attente", "Traitée", "Rejetée"],
            default:"En attente"
        }

    },
    {timestamps:true}
)

export default mongoose.model("Reclamation",reclamationSchema)