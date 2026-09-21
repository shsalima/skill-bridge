import mongoose from "mongoose";

const entrepriseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    nomEntreprise: { 
        type: String,
        required: true,
        trim: true 
    },
    description: { 
        type: String,
        trim: true ,
        default:""
    },
    adresse: { 
        type: String, 
        trim: true ,
        default:""
    },
    ville: {
        type: String, 
        trim: true ,
        default:""
    },
    siteWeb: { 
        type: String, 
        trim: true ,
        default:""
    },
    logo: { 
        type: String, 
        trim: true ,
        default:""
    },
    estBloquee: { 
        type: Boolean,
       default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Entreprise", entrepriseSchema);