import mongoose from "mongoose";

const jobSechema= mongoose.Schema(
    {
        titre:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        typeContrat:{
            type:String,
            enum:["CDI", "CDD", "Stage", "Freelance"],
            required:true,
        },
        domaine:{
            type:String,
            required:true
    
        },
        ville:{
            type:String,
            required:true
        },
        competencesRequises:[{
            type:String,
            required:true
        }],
        salaire:{
            type:Number,
            default:0
        },
        dateLimite:{
            type:Date,
            required:true
        },
        entreprise:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
      statut: {
      type: String,
      enum: ["Ouverte", "Fermée"], 
      default: "Ouverte",
    },
    },
    {timestamps:true}
)
export default mongoose.model("Job",jobSechema)