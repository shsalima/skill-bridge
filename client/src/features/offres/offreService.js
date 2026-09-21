import api from "../../utils/axiosInstance";

const getAllJobs = async (params = {}) => {
  const response = await api.get("/jobs", { params });
  return response;
};

const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response;
};

const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response;
};

const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/jobs/${jobId}`, jobData);
  return response;
};

const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);
  return response;
};

const toggleJobStatus = async (jobId, statut) => {
  const response = await api.patch(`/jobs/${jobId}/status`, { statut });
  return response;
};

const getEntrepriseStats = async () => {
  const response = await api.get("/dashboard/entreprise");
  return response;
};

const getAdminStats = async () => {
  const response = await api.get("/dashboard/admin");
  return response;
};

const offreService = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getEntrepriseStats,
  getAdminStats,
};

export default offreService;
