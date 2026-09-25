import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import offreService from "./offreService";

export const fetchJobs = createAsyncThunk(
  "offres/fetchJobs",
  async (params, { rejectWithValue }) => {
    try {
      const response = await offreService.getAllJobs(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des offres"
      );
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "offres/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await offreService.getJobById(jobId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la récupération de l'offre"
      );
    }
  }
);

export const createJob = createAsyncThunk(
  "offres/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await offreService.createJob(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la création de l'offre"
      );
    }
  }
);

export const updateJob = createAsyncThunk(
  "offres/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await offreService.updateJob(jobId, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la modification de l'offre"
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  "offres/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await offreService.deleteJob(jobId);
      return jobId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la suppression de l'offre"
      );
    }
  }
);

export const toggleJobStatus = createAsyncThunk(
  "offres/toggleJobStatus",
  async ({ jobId, statut }, { rejectWithValue }) => {
    try {
      const response = await offreService.toggleJobStatus(jobId, statut);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la modification du statut"
      );
    }
  }
);

export const fetchEntrepriseStats = createAsyncThunk(
  "offres/fetchEntrepriseStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await offreService.getEntrepriseStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des statistiques"
      );
    }
  }
);

export const fetchAdminStats = createAsyncThunk(
  "offres/fetchAdminStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await offreService.getAdminStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des statistiques globales"
      );
    }
  }
);

const initialState = {
  jobs: [],
  totalJobs: 0,
  ouverteJobs: 0,
  fermelJobs: 0,
  selectedJob: null,
  selectedJobEntreprise: null,
  filters: {
    keyword: "",
    domaine: "",
    ville: "",
    typeContrat: "",
    statut: "",
  },
  entrepriseStats: {
    totalJobs: 0,
    totalApplications: 0,
    statusBreakdown: [],
  },
  adminStats: {
    totalUser: 0,
    totalCandidats: 0,
    totalEntreprise: 0,
    totalJobs: 0,
    totalApplications: 0,
  },
  loading: false,
  actionLoading: false,
  error: null,
  successMessage: null,
};

const offreSlice = createSlice({
  name: "offres",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    clearOffreError: (state) => {
      state.error = null;
    },
    clearOffreSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data ;
        state.totalJobs = action.payload.count ;
        state.ouverteJobs = action.payload.ouverteJobs ;
        state.fermelJobs = action.payload.fermelJobs ;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload.data;
        state.selectedJobEntreprise = action.payload.entreprise;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createJob
      .addCase(createJob.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload) {
          state.jobs.unshift(action.payload);
          state.totalJobs += 1;
          if (action.payload.statut === "Fermée") {
            state.fermelJobs += 1;
          } else {
            state.ouverteJobs += 1;
          }
        }
        state.successMessage = "Offre publiée avec succès";
      })
      .addCase(createJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // updateJob
      .addCase(updateJob.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        state.jobs = state.jobs.map((j) => (j._id === updated._id ? updated : j));
        if (state.selectedJob?._id === updated._id) {
          state.selectedJob = { ...state.selectedJob, ...updated };
        }
        state.successMessage = "Offre modifiée avec succès";
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // deleteJob
      .addCase(deleteJob.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.actionLoading = false;
        const removed = state.jobs.find((j) => j._id === action.payload);
        state.jobs = state.jobs.filter((j) => j._id !== action.payload);
        state.totalJobs = Math.max(0, state.totalJobs - 1);
        if (removed?.statut === "Fermée") {
          state.fermelJobs = Math.max(0, state.fermelJobs - 1);
        } else if (removed?.statut === "Ouverte") {
          state.ouverteJobs = Math.max(0, state.ouverteJobs - 1);
        }
        state.successMessage = "Offre supprimée avec succès";
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // toggleJobStatus
      .addCase(toggleJobStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        state.jobs = state.jobs.map((j) => (j._id === updated._id ? updated : j));
        if (state.selectedJob?._id === updated._id) {
          state.selectedJob = { ...state.selectedJob, ...updated };
        }
        if (updated.statut === "Fermée") {
          state.ouverteJobs = Math.max(0, state.ouverteJobs - 1);
          state.fermelJobs += 1;
        } else {
          state.fermelJobs = Math.max(0, state.fermelJobs - 1);
          state.ouverteJobs += 1;
        }
        state.successMessage =
          updated.statut === "Fermée"
            ? "Offre clôturée avec succès"
            : "Offre réactivée avec succès";
      })
      .addCase(toggleJobStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // stats
      .addCase(fetchEntrepriseStats.fulfilled, (state, action) => {
        state.entrepriseStats = action.payload || state.entrepriseStats;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.adminStats = action.payload || state.adminStats;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setSelectedJob,
  clearOffreError,
  clearOffreSuccess,
} = offreSlice.actions;

export default offreSlice.reducer;
