import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

export const fetchMyNotifications = createAsyncThunk(
  "notifications/fetchMyNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getMyNotifications();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des notifications"
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await notificationService.markAsRead(notificationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la mise à jour de la notification"
      );
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMyNotifications
      .addCase(fetchMyNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.lu).length;
      })
      .addCase(fetchMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // markNotificationAsRead
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updated = action.payload;
        state.notifications = state.notifications.map((n) =>
          n._id === updated._id ? { ...n, lu: true } : n
        );
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      });
  },
});

export const { clearNotificationError } = notificationSlice.actions;
export default notificationSlice.reducer;
