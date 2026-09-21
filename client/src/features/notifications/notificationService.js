import api from "../../utils/axiosInstance";

const getMyNotifications = async () => {
  const response = await api.get("/notification/my-notifications");
  return response;
};

const markAsRead = async (notificationId) => {
  const response = await api.patch(`/notification/${notificationId}/read`);
  return response;
};

const notificationService = {
  getMyNotifications,
  markAsRead,
};

export default notificationService;
