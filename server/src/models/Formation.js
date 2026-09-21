import mongoose from "mongoose"


const formationSchema = new mongoose.Schema(
    {
        candidat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        titre:{
            type:String,
            required:true,
            trim:true
        },
        etablissement:{
            type:String,
            required:true,
            trim:true
        },
        anneeDebut:{
            type:String,
            trim:true
        },
        anneeFin:{
            type:String,
            trim:true
        },
        description:{
            type:String,
            trim:true
        }
    },
    {timestamps:true}
)

export default mongoose.model("Formation",formationSchema)