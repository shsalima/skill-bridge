import { toggleSaveJobService, getMySavedJobsService } from "../services/savedJob.service.js";

export const toggleSaveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const result = await toggleSaveJobService(req.user.id, jobId);
    return res.status(200).json({
         success: true,
          ...result 
        });
  } catch (error) {
    return res.status(400).json({
         success: false,
          message: error.message 
        });
  }
};

export const getMySavedJobs = async (req, res) => {
  try {
    const savedJobs = await getMySavedJobsService(req.user.id);
    return res.status(200).json({
      success: true,
      count: savedJobs.length,
      data: savedJobs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};