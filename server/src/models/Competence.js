import mongoose from "mongoose";

const competenceSchema = new mongoose.Schema(
  {
    competences: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    candidat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
      unique:true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Competence", competenceSchema);