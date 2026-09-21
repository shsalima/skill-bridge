import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authService.register(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authService.login(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email ou mot de passe incorrect"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la récupération du profil"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la mise à jour du profil"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await authService.logout();
    dispatch(authSlice.actions.logout());
  }
);

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des utilisateurs"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await authService.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  }
);

export const fetchAllCompanies = createAsyncThunk(
  "auth/fetchAllCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getAllCompanies();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des entreprises"
      );
    }
  }
);

export const toggleBlockCompany = createAsyncThunk(
  "auth/toggleBlockCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await authService.toggleBlockCompany(companyId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du blocage de l'entreprise"
      );
    }
  }
);

const initialToken = localStorage.getItem("token") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
    user: null,
    role: null,
    loading: false,
    error: null,
    successMessage: null,
    usersList: [],
    companiesList: [],
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
      state.successMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data?.utilisateur || action.payload.data;
        state.token = action.payload.data?.token || state.token;
        state.role = state.user?.role || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data?.utilisateur || action.payload.data;
        state.token = action.payload.data?.token;
        state.role = state.user?.role || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.role = action.payload.data?.role || null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload.data };
        state.successMessage = "Profil mis à jour avec succès";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Admin: Fetch All Users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload || [];
      })
      // Admin: Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersList = state.usersList.filter((u) => u._id !== action.payload);
      })
      // Admin: Fetch All Companies
      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.companiesList = action.payload || [];
      })
      // Admin: Toggle Block Company
      .addCase(toggleBlockCompany.fulfilled, (state, action) => {
        const updated = action.payload;
        state.companiesList = state.companiesList.map((c) =>
          c._id === updated._id ? updated : c
        );
      });
  },
});

export const { clearError, clearSuccessMessage, logout } = authSlice.actions;
export default authSlice.reducer;
