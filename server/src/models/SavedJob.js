import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    candidat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);
// makaykhalihch y save ktar mn mara
savedJobSchema.index({ candidat: 1, job: 1 }, { unique: true });

export default mongoose.model("SavedJob", savedJobSchema);