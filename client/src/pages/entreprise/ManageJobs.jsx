import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  Briefcase,
  Plus,
  Users,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  fetchJobs,
  deleteJob,
  toggleJobStatus,
  clearOffreSuccess,
  clearOffreError,
} from "../../features/offres/offreSlice";
import { formatDate, formatSalary } from "../../utils/formatters";

export const ManageJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { jobs, loading, actionLoading, successMessage, error } = useSelector(
    (state) => state.offres
  );

  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => dispatch(clearOffreSuccess()), 3500);
      return () => clearTimeout(t);
    }
  }, [successMessage, dispatch]);

  const companyJobs = jobs.filter(
    (j) =>
      String(j.entreprise?._id || j.entreprise) === String(user?._id || user?.id)
  );

  const filteredJobs = companyJobs.filter((j) => {
    if (activeTab === "Ouverte") return j.statut === "Ouverte";
    if (activeTab === "Fermée") return j.statut === "Fermée";
    return true;
  });

  const handleToggle = (job) => {
    const nextStatut = job.statut === "Ouverte" ? "Fermée" : "Ouverte";
    dispatch(toggleJobStatus({ jobId: job._id, statut: nextStatut }));
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette offre ?")) {
      dispatch(deleteJob(jobId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-[#00E6A5]" />
            <span>Mes Offres d'Emploi</span>
          </h1>
          <p className="text-xs text-[#90A1B9] mt-1">
            Gérez vos annonces, modifiez leur statut et consultez les candidatures reçues.
          </p>
        </div>

        <Link to="/entreprise/jobs/create">
          <button
            type="button"
            className="inline-flex items-center justify-center font-bold rounded-xl transition-all px-4 py-2.5 text-xs gap-2 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publier une offre</span>
          </button>
        </Link>
      </div>

      {successMessage && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "Toutes les offres", count: companyJobs.length },
          {
            id: "Ouverte",
            label: "Actives (Ouvertes)",
            count: companyJobs.filter((j) => j.statut === "Ouverte").length,
          },
          {
            id: "Fermée",
            label: "Clôturées",
            count: companyJobs.filter((j) => j.statut === "Fermée").length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#00E6A5] text-[#0B0E14] font-bold shadow-[0_0_15px_rgba(0,230,165,0.2)]"
                : "bg-[#161B22] text-[#90A1B9] hover:text-white border border-[#374151]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id
                  ? "bg-[#0B0E14]/30 text-[#0B0E14]"
                  : "bg-[#0B0E14] text-[#90A1B9]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Chargement de vos annonces...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 text-center py-12 space-y-3">
          <Briefcase className="w-8 h-8 text-[#90A1B9] mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-white">Aucune offre trouvée</h3>
          <p className="text-xs text-[#90A1B9]">
            Vous n'avez pas d'offres correspondant à ce filtre.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 hover:border-[#00E6A5]/50 hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      job.statut === "Ouverte"
                        ? "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}
                  >
                    {job.statut}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#90A1B9] bg-[#0B0E14] px-2 py-0.5 rounded border border-[#374151]">
                    {job.typeContrat}
                  </span>
                  <span className="text-xs text-[#90A1B9]">{job.domaine}</span>
                </div>

                <h3 className="text-base font-bold text-white">{job.titre}</h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00E6A5]" />
                    {job.ville}
                  </span>
                  <span>•</span>
                  <span>{formatSalary(job.salaire)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Limite : {formatDate(job.dateLimite)}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.competencesRequises?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#0B0E14] text-[#90A1B9] border border-[#374151] px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#374151]">
                <Link
                  to={`/entreprise/applications?jobId=${job._id}`}
                  className="px-3 py-2 bg-[#00E6A5]/10 hover:bg-[#00E6A5] text-[#00E6A5] hover:text-[#0B0E14] border border-[#00E6A5]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Candidatures</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleToggle(job)}
                  title={job.statut === "Ouverte" ? "Clôturer l'offre" : "Réactiver l'offre"}
                  className="px-3 py-2 bg-[#0B0E14] hover:bg-[#161B22] border border-[#374151] rounded-xl text-xs font-semibold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {job.statut === "Ouverte" ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-[#00E6A5]" />
                      <span>Clôturer</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-[#90A1B9]" />
                      <span>Réactiver</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/entreprise/jobs/edit/${job._id}`}
                  className="p-2 bg-[#0B0E14] hover:bg-[#161B22] border border-[#374151] rounded-xl text-[#90A1B9] hover:text-white transition-colors"
                  title="Modifier l'offre"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(job._id)}
                  className="p-2 bg-[#0B0E14] hover:bg-red-500/10 border border-[#374151] hover:border-red-500/30 rounded-xl text-[#90A1B9] hover:text-red-400 transition-colors cursor-pointer"
                  title="Supprimer l'offre"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
