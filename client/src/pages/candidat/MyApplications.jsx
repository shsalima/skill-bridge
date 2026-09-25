import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  FileCheck2,
  Building2,
  Calendar,
  ExternalLink,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { fetchMyApplications } from "../../features/candidatures/candidatureSlice";
import { formatDate, getStatusBadge } from "../../utils/formatters";

export const MyApplications = () => {
  const dispatch = useDispatch();
  const { myApplications, loading } = useSelector((state) => state.candidatures);
  const [filterStatut, setFilterStatut] = useState("all");

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const filtered = myApplications.filter((app) => {
    if (filterStatut === "all") return true;
    return app.statut === filterStatut;
  });

  const countByStatut = {
    all: myApplications.length,
    "En attente": myApplications.filter((a) => a.statut === "En attente").length,
    "Acceptée": myApplications.filter((a) => a.statut === "Acceptée").length,
    "Refusée": myApplications.filter((a) => a.statut === "Refusée").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <FileCheck2 className="w-6 h-6 text-[#00E6A5]" />
          <span>Mes Candidatures</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Suivez l'état d'avancement de toutes vos candidatures envoyées.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Toutes les candidatures" },
          { id: "En attente", label: "En cours d'étude" },
          { id: "Acceptée", label: "Acceptées" },
          { id: "Refusée", label: "Refusées" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatut(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              filterStatut === tab.id
                ? "bg-[#00E6A5] text-[#0B0E14] font-bold shadow-[0_0_15px_rgba(0,230,165,0.25)]"
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
              {countByStatut[tab.id] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Chargement de vos candidatures...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 text-center py-12 space-y-3">
          <FileCheck2 className="w-8 h-8 text-[#90A1B9] mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-white">
            Aucune candidature dans cette catégorie
          </h3>
          <p className="text-xs text-[#90A1B9]">
            Consultez les offres d'emploi pour postuler et voir vos résultats ici.
          </p>
          <Link
            to="/candidat/jobs"
            className="inline-block mt-2 text-xs font-bold text-[#00E6A5] hover:underline"
          >
            Découvrir les offres disponibles
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app._id}
              className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 hover:border-[#00E6A5]/50 hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#90A1B9] bg-[#0B0E14] px-2 py-0.5 rounded border border-[#374151]">
                    {app.job?.typeContrat || "Contrat"}
                  </span>
                  <span className="text-xs text-[#90A1B9]">
                    {app.job?.domaine || "Domaine"}
                  </span>
                </div>

                <Link
                  to={`/candidat/jobs/${app.job?._id || app.job}`}
                  className="text-base font-bold text-white hover:text-[#00E6A5] transition-colors block"
                >
                  {app.job?.titre || "Offre d'emploi"}
                </Link>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9]">
                  <span className="flex items-center gap-1 text-white">
                    <Building2 className="w-3.5 h-3.5 text-[#00E6A5]" />
                    {app.job?.entreprise?.nomEntreprise || "Entreprise"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Postulé le {formatDate(app.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#374151]">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(app.statut)}`}>
                    {app.statut}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {app.cv && (
                    <a
                      href={app.cv}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#90A1B9] hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Voir le CV envoyé</span>
                    </a>
                  )}
                  <Link
                    to={`/candidat/jobs/${app.job?._id || app.job}`}
                    className="text-xs text-[#00E6A5] hover:underline font-semibold"
                  >
                    Voir l'offre
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
