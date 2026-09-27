
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import offreReducer from "../features/offres/offreSlice";
import candidatureReducer from "../features/candidatures/candidatureSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import reclamationReducer from "../features/reclamations/reclamationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    offres: offreReducer,
    candidatures: candidatureReducer,
    notifications: notificationReducer,
    reclamations: reclamationReducer,
  },
});

export default store;