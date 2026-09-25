import api from "../../utils/axiosInstance";

const applyToJob = async (jobId, applicationData) => {
  const response = await api.post(`/applications/apply/${jobId}`, applicationData);
  return response;
};

const getMyApplications = async () => {
  const response = await api.get("/applications/my-applications");
  return response;
};

const getApplicationsByJob = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response;
};

const updateApplicationStatus = async (applicationId, statut) => {
  const response = await api.patch(`/applications/${applicationId}/status`, { statut });
  return response;
};

// Saved jobs
const toggleSavedJob = async (jobId) => {
  const response = await api.post("/saved-jobs/toggle", { jobId });
  return response;
};

const getMySavedJobs = async () => {
  const response = await api.get("/saved-jobs/my-saved");
  return response;
};

const candidatureService = {
  applyToJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  toggleSavedJob,
  getMySavedJobs,
};

export default candidatureService;
