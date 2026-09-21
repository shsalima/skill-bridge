import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import offreReducer from "../features/offres/offreSlice";
import candidatureReducer from "../features/candidatures/candidatureSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import reclamationReducer from "../features/reclamations/reclamationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  offres: offreReducer,
  candidatures: candidatureReducer,
  notifications: notificationReducer,
  reclamations: reclamationReducer,
});

export default rootReducer;
