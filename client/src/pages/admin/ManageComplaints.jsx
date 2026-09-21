import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Briefcase,
  User,
  Calendar,
} from "lucide-react";
import {
  fetchAllReclamations,
  updateReclamationStatus,
  clearReclamationSuccess,
} from "../../features/reclamations/reclamationSlice";
import { deleteJob } from "../../features/offres/offreSlice";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/formatters";

export const ManageComplaints = () => {
  const dispatch = useDispatch();
  const { reclamations, loading, actionLoading, successMessage } = useSelector(
    (state) => state.reclamations
  );

  const [filterStatut, setFilterStatut] = useState("all");

  useEffect(() => {
    dispatch(fetchAllReclamations());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => dispatch(clearReclamationSuccess()), 3500);
      return () => clearTimeout(t);
    }
  }, [successMessage, dispatch]);

  const handleUpdateStatus = (reclamationId, nextStatus) => {
    dispatch(
      updateReclamationStatus({
        reclamationId,
        statut: nextStatus,
      })
    );
  };

  const handleDeleteReportedJob = (jobId, jobTitle) => {
    if (
      window.confirm(
        `Supprimer l'offre "${jobTitle}" signalée comme frauduleuse ?`
      )
    ) {
      dispatch(deleteJob(jobId));
    }
  };

  const filtered = reclamations.filter((r) => {
    if (filterStatut === "all") return true;
    return r.statut === filterStatut;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
          <span>Gestion des Réclamations & Signalements</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Arbitrez les signalements déposés contre des offres suspectes ou frauduleuses.
        </p>
      </div>

      {successMessage && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "Tous les signalements", count: reclamations.length },
          {
            id: "En attente",
            label: "En attente",
            count: reclamations.filter((r) => r.statut === "En attente").length,
          },
          {
            id: "Traitée",
            label: "Traités",
            count: reclamations.filter((r) => r.statut === "Traitée").length,
          },
          {
            id: "Rejetée",
            label: "Rejetés",
            count: reclamations.filter((r) => r.statut === "Rejetée").length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatut(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              filterStatut === tab.id
                ? "bg-[#00E6A5] text-[#0B0E14] font-bold shadow-[0_0_15px_rgba(0,230,165,0.2)]"
                : "bg-[#161B22] text-[#90A1B9] hover:text-white border border-[#374151]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterStatut === tab.id
                  ? "bg-[#0B0E14]/30 text-[#0B0E14]"
                  : "bg-[#0B0E14] text-[#90A1B9]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Complaints Cards */}
      {loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Chargement des signalements...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12 space-y-3">
          <ShieldAlert className="w-8 h-8 text-[#90A1B9] mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-white">
            Aucun signalement dans cette section
          </h3>
          <p className="text-xs text-[#90A1B9]">
            Tous les signalements sont traités ou aucun n'a encore été déposé.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <Card
              key={r._id}
              hover
              className="flex flex-col lg:flex-row lg:items-start justify-between gap-5"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {r.motif}
                  </span>
                  <Badge status={r.statut} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    Offre signalée : {r.job?.titre || "Offre supprimée"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9] mt-1">
                    <span className="flex items-center gap-1 text-white">
                      <User className="w-3.5 h-3.5 text-[#00E6A5]" />
                      Déposé par : {r.auteur?.prenom} {r.auteur?.nom} ({r.auteur?.email})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Le {formatDate(r.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-[#CAD5E2] leading-relaxed">
                  <span className="text-[#90A1B9] font-bold block mb-1">
                    Description du motif :
                  </span>
                  {r.description}
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-col gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#374151] shrink-0 min-w-[200px]">
                <span className="text-[10px] text-[#90A1B9] uppercase font-bold">
                  Actions de modération :
                </span>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(r._id, "Traitée")}
                  disabled={actionLoading || r.statut === "Traitée"}
                  className="px-3.5 py-2 rounded-xl bg-[#00E6A5]/10 hover:bg-[#00E6A5] text-[#00E6A5] hover:text-[#0B0E14] border border-[#00E6A5]/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Valider comme Traitée</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(r._id, "Rejetée")}
                  disabled={actionLoading || r.statut === "Rejetée"}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#90A1B9] hover:text-white border border-[#374151] text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Rejeter le signalement</span>
                </button>

                {r.job?._id && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteReportedJob(r.job._id, r.job.titre)
                    }
                    className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Supprimer l'offre</span>
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;
