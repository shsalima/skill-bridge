import api from "../../utils/axiosInstance";

const register = async (userData) => {
  const response = await api.post("/users/register", userData);
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response;
};

const updateProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);
  return response;
};

const logout = async () => {
  try {
    await api.post("/users/logout");
  } catch (err) {
    // Ignore error on logout
  }
  localStorage.removeItem("token");
};

// Admin user & company services
const getAllUsers = async () => {
  const response = await api.get("/users");
  return response;
};

const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response;
};

const getAllCompanies = async () => {
  const response = await api.get("/users/companies/all");
  return response;
};

const toggleBlockCompany = async (companyId) => {
  const response = await api.patch(`/users/companies/${companyId}/block`);
  return response;
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
  getAllUsers,
  deleteUser,
  getAllCompanies,
  toggleBlockCompany,
};

export default authService;
