import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import candidatureService from "./candidatureService";

export const applyToJob = createAsyncThunk(
  "candidatures/applyToJob",
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await candidatureService.applyToJob(jobId, applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de l'envoi de la candidature"
      );
    }
  }
);

export const fetchMyApplications = createAsyncThunk(
  "candidatures/fetchMyApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await candidatureService.getMyApplications();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des candidatures"
      );
    }
  }
);

export const fetchApplicationsByJob = createAsyncThunk(
  "candidatures/fetchApplicationsByJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await candidatureService.getApplicationsByJob(jobId);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des candidatures du poste"
      );
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "candidatures/updateApplicationStatus",
  async ({ applicationId, statut }, { rejectWithValue }) => {
    try {
      const response = await candidatureService.updateApplicationStatus(applicationId, statut);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la mise à jour du statut"
      );
    }
  }
);

export const toggleSavedJob = createAsyncThunk(
  "candidatures/toggleSavedJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await candidatureService.toggleSavedJob(jobId);
      return { jobId, ...response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de l'enregistrement de l'offre"
      );
    }
  }
);

export const fetchMySavedJobs = createAsyncThunk(
  "candidatures/fetchMySavedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await candidatureService.getMySavedJobs();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des offres sauvegardées"
      );
    }
  }
);



const initialState = {
  myApplications: [],
  jobApplications: [],
  savedJobs: [],
  loading: false,
  actionLoading: false,
  error: null,
  successMessage: null,
};

const candidatureSlice = createSlice({
  name: "candidatures",
  initialState,
  reducers: {
    clearCandidatureError: (state) => {
      state.error = null;
    },
    clearCandidatureSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // applyToJob
      .addCase(applyToJob.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.myApplications.unshift(action.payload);
        state.successMessage = "Votre candidature a été envoyée avec succès !";
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // fetchMyApplications
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchApplicationsByJob
      .addCase(fetchApplicationsByJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationsByJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobApplications = action.payload;
      })
      .addCase(fetchApplicationsByJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateApplicationStatus
      .addCase(updateApplicationStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        state.jobApplications = state.jobApplications.map((app) =>
          app._id === updated._id ? { ...app, statut: updated.statut } : app
        );
        state.successMessage = "Statut de la candidature mis à jour avec succès";
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // toggleSavedJob
      .addCase(toggleSavedJob.fulfilled, (state, action) => {
        const { jobId, message } = action.payload;
        if (message?.includes("retirée") || message?.includes("supprimée")) {
          state.savedJobs = state.savedJobs.filter((item) => (item.job?._id || item.job) !== jobId);
        } else {
          // Add if not present
          const exists = state.savedJobs.some((item) => (item.job?._id || item.job) === jobId);
          if (!exists) {
            state.savedJobs.unshift({ job: { _id: jobId } });
          }
        }
      })
      // fetchMySavedJobs
      .addCase(fetchMySavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload;
      });
  },
});

export const { clearCandidatureError, clearCandidatureSuccess } = candidatureSlice.actions;
export default candidatureSlice.reducer;
