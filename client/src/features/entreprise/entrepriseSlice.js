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

export const toggleJobStatus = createAsyncThunk(
  "entreprise/toggleJobStatus",
  async ({ jobId, statut }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/jobs/${jobId}/status`, { statut });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors du changement de statut de l'offre",
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
        const createdJob = action.payload;
        if (createdJob && createdJob._id) {
          // n'ajouter dans la liste que si l'onglet actif accepte ce statut
          if (!state.statut || state.statut === createdJob.statut) {
            state.jobs.unshift(createdJob);
          }
          state.totalJobs += 1;
          if (createdJob.statut === "Fermée") {
            state.fermelJobs += 1;
          } else {
            state.ouverteJobs += 1;
          }
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
      })
      // update status offre
      .addCase(toggleJobStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedJob = action.payload;
       state.jobs = state.jobs.map((job) =>
          job._id === updatedJob._id ? { ...job, ...updatedJob } : job,
        );

        // 2. si un onglet de filtre est actif, retirer l'offre qui ne
        // correspond plus au statut filtré (ex: onglet "Offres actives")
        if (state.statut && state.statut !== updatedJob.statut) {
          state.jobs = state.jobs.filter((job) => job._id !== updatedJob._id);
        }
         if (state.selectedJob && state.selectedJob._id === updatedJob._id) {
          state.selectedJob = { ...state.selectedJob, ...updatedJob };
        }

        // 4. mise à jour des compteurs des onglets
        if (updatedJob.statut === "Fermée") {
          state.ouverteJobs = Math.max(0, state.ouverteJobs - 1);
          state.fermelJobs += 1;
        } else {
          state.fermelJobs = Math.max(0, state.fermelJobs - 1);
          state.ouverteJobs += 1;
        }
        state.successMessage =
          updatedJob.statut === "Fermée"
            ? "Offre clôturée avec succès"
            : "Offre réactivée avec succès";
      })
      .addCase(toggleJobStatus.rejected, (state, action) => {
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
