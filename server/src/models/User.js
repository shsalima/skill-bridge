import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
        nom:{
            type:String,
            
        },
        prenom:{
            type:String,
           
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
            enum:["Candidat","AdministrateurEntreprise","Administrateur"],
            default:"Candidat",
        },
     


      
    
    },
    {
    timestamps:true,
    }
)
const User=mongoose.model("User",userSchema)
export default User