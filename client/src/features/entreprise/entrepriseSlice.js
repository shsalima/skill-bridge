import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axiosInstance";



export const getCompanyJobs = createAsyncThunk(
  "entreprise/getCompanyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/jobs");
      return response.data; // Kireje3 [job1, job2, ...]
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des offres"
      );
    }
  }
);



export const createJob = createAsyncThunk(
  "entreprise/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await api.post("/jobs", jobData);
      return response.data; // kireje3 { message, job }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la création de l'offre"
      );
    }
  }
);




const entrepriseSlice=createSlice({
    name:"entreprise",
    initialState:{
        companyInfo: null,
        jobs: [],
        applications: [],
        selectedJob: null, // للـ View/Edit Details
        stats: {
        activeJobs: 0,
        totalApplications: 0,
        acceptedCandidates: 0,
        averageMatchScore: 0,
        },
        loading: false,
        actionLoading: false, // Loading خاص بالأفعال السريعة (حذف/تعديل حالة)
        error: null,
        successMessage: null,
        

    },
    reducers:{
        clearEntrepriseError:(state)=>{
            state.error=null
        },
        clearSuccessMessage: (state) => {
           state.successMessage = null;
        },
        setSelectedJob:(state,action)=>{
            state.selectedJob=action.payload
        }
    },
    extraReducers: (builder) => {
    builder
      // getCompanyJobs
      .addCase(getCompanyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
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
    }
})
export const { clearEntrepriseError, clearSuccessMessage, setSelectedJob } = entrepriseSlice.actions;
export default entrepriseSlice.reducer;