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
        required: true, 
        trim: true 
    },
    adresse: { 
        type: String, 
        required: true, 
        trim: true 
    },
    ville: {
         type: String, 
         required: true, 
         trim: true 
    },
    siteWeb: { 
        type: String, 
        trim: true 
    },
    logo: { 
        type: String, 
        trim: true 
    },
    estBloquee: { 
        type: Boolean,
       default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Entreprise", entrepriseSchema);