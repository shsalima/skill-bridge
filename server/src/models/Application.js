import mongoose from "mongoose";


const applicationSchema=new mongoose.Schema(
    {
        candidat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        job:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job",
            required:true
        },
        cvUrl:{
            type:String,
            required:true
        },
        lettreMotivation:{
            type:String,
            default:""
        },
        scoreMatching:{
            type:Number,
            default:0
        },
        statut:{
            type:String,
            enum:["En attente", "Acceptée", "Refusée"],
            default:"En attente",
        }
    },
    {timestamps:true}
)
// Compound Unique Index
applicationSchema.index({condidat:1, job:1}, {unique:true})


export default mongoose.Model("Application",applicationSchema)