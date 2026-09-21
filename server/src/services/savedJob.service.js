import SavedJob from "../models/SavedJob.js";
import Job from "../models/Job.js";

export const toggleSaveJobService = async (candidatId, jobId) => {
  const jobExists = await Job.findById(jobId);
  if (!jobExists){

      throw new Error("Offre non trouvée.");
  }

  const existingSave = await SavedJob.findOne({ candidat: candidatId, job: jobId });

  if (existingSave) {
    await existingSave.deleteOne();
    return {
         saved: false, 
         message: "Offre retirée des enregistrements."
     };
  } else {
    await SavedJob.create({ candidat: candidatId, job: jobId });
    return { 
        saved: true, 
        message: "Offre enregistrée avec succès." 
    };
  }
};

export const getMySavedJobsService = async (candidatId) => {
  return await SavedJob.find({ candidat: candidatId })
    .populate("job")
    .sort({ createdAt: -1 });
};