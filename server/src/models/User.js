import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
        nom:{
            type:String,
            required:true,
        },
        prenom:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        motDePasse: {
           type: String,
           required: true,
        },
        telephone: {
          type: String,
        },

        photo: {
          type: String,
        },
        role:{
            type:String,
            enum:["Candidat","Entreprise","Administrateur"],
            default:"Candidat",
        },
        dateNaissance:{
            type:Date,
        },
    },
    {
    timestamps:true,
    }
)
const User=mongoose.model("User",userSchema)
export default User