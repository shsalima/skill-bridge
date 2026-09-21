import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reclamationService from "./reclamationService";

export const createReclamation = createAsyncThunk(
  "reclamations/createReclamation",
  async (reclamationData, { rejectWithValue }) => {
    try {
      const response = await reclamationService.createReclamation(reclamationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de l'envoi de la réclamation"
      );
    }
  }
);

export const fetchAllReclamations = createAsyncThunk(
  "reclamations/fetchAllReclamations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await reclamationService.getAllReclamations();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors du chargement des réclamations"
      );
    }
  }
);

export const updateReclamationStatus = createAsyncThunk(
  "reclamations/updateReclamationStatus",
  async ({ reclamationId, statut }, { rejectWithValue }) => {
    try {
      const response = await reclamationService.updateReclamationStatus(reclamationId, statut);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la mise à jour de la réclamation"
      );
    }
  }
);

const initialState = {
  reclamations: [],
  loading: false,
  actionLoading: false,
  error: null,
  successMessage: null,
};

const reclamationSlice = createSlice({
  name: "reclamations",
  initialState,
  reducers: {
    clearReclamationError: (state) => {
      state.error = null;
    },
    clearReclamationSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createReclamation
      .addCase(createReclamation.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createReclamation.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.reclamations.unshift(action.payload);
        state.successMessage = "Réclamation soumise avec succès";
      })
      .addCase(createReclamation.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // fetchAllReclamations
      .addCase(fetchAllReclamations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReclamations.fulfilled, (state, action) => {
        state.loading = false;
        state.reclamations = action.payload;
      })
      .addCase(fetchAllReclamations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateReclamationStatus
      .addCase(updateReclamationStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateReclamationStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = action.payload;
        state.reclamations = state.reclamations.map((r) =>
          r._id === updated._id ? { ...r, statut: updated.statut } : r
        );
        state.successMessage = "Statut de la réclamation mis à jour";
      })
      .addCase(updateReclamationStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReclamationError, clearReclamationSuccess } = reclamationSlice.actions;
export default reclamationSlice.reducer;
