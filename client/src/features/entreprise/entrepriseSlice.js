import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axiosInstance";

export const getCompanyJobs = createAsyncThunk(
  "entreprise/getCompanyJobs",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs", { params: params });
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des offres",
      );
    }
  },
);

export const createJob = createAsyncThunk(
  "entreprise/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await api.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la création de l'offre",
      );
    }
  },
);
export const getJobById = createAsyncThunk(
  "entreprise/getJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur de chargement de l'offre",
      );
    }
  },
);

export const deleteJob = createAsyncThunk(
  "entreprise/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await api.delete(`/jobs/${jobId}`);

      return jobId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur lors de la suppression",
      );
    }
  },
);

const entrepriseSlice = createSlice({
  name: "entreprise",
  initialState: {
    companyInfo: null,
    jobs: [],
    totalJobs: 0,
    ouverteJobs: 0,
    fermelJobs: 0,
    applications: [],
    selectedJob: null,
    selectedJobEntreprise: null,
    stats: {
      activeJobs: 0,
      totalApplications: 0,
      acceptedCandidates: 0,
      averageMatchScore: 0,
    },
    loading: false,
    actionLoading: false,
    error: null,
    successMessage: null,
    statut: "",
  },
  reducers: {
    setStatut: (state, action) => {
      state.statut = action.payload;
    },
    clearEntrepriseError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //
      .addCase(getCompanyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.totalJobs = action.payload.count;
        state.ouverteJobs = action.payload.ouverteJobs;
        state.fermelJobs = action.payload.fermelJobs;
      })
      .addCase(getCompanyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   createJob
      .addCase(createJob.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload.job) {
          state.jobs.unshift(action.payload.job);
        }
        state.successMessage = "Offre d'emploi créée avec succès!";
      })
      .addCase(createJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // afficher_id
      .addCase(getJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedJob = action.payload.data;
        state.selectedJobEntreprise = action.payload.entreprise;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   delete
      .addCase(deleteJob.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
        state.successMessage = "Offre supprimée avec succès";
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setStatut,
  clearEntrepriseError,
  clearSuccessMessage,
  setSelectedJob,
} = entrepriseSlice.actions;
export default entrepriseSlice.reducer;
