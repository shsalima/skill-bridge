import api from "../../utils/axiosInstance";

const createReclamation = async (reclamationData) => {
  const response = await api.post("/reclamation", reclamationData);
  return response;
};

const getAllReclamations = async () => {
  const response = await api.get("/reclamation");
  return response;
};

const updateReclamationStatus = async (reclamationId, statut) => {
  const response = await api.patch(`/reclamation/${reclamationId}/status`, { statut });
  return response;
};

const reclamationService = {
  createReclamation,
  getAllReclamations,
  updateReclamationStatus,
};

export default reclamationService;
