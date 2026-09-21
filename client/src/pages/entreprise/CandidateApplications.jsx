import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router";
import {
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Phone,
  Mail,
  FileText,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { fetchJobs } from "../../features/offres/offreSlice";
import {
  fetchApplicationsByJob,
  updateApplicationStatus,
  clearCandidatureSuccess,
} from "../../features/candidatures/candidatureSlice";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import SmartMatchingBadge from "../../components/matching/SmartMatchingBadge";
import { formatDate } from "../../utils/formatters";

export const CandidateApplications = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJobIdFromUrl = searchParams.get("jobId");

  const { user } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.offres);
  const {
    jobApplications,
    loading,
    actionLoading,
    successMessage,
  } = useSelector((state) => state.candidatures);

  const companyJobs = jobs.filter(
    (j) =>
      String(j.entreprise?._id || j.entreprise) === String(user?._id || user?.id)
  );

  const [selectedJobId, setSelectedJobId] = useState(
    selectedJobIdFromUrl || companyJobs[0]?._id || ""
  );
  const [filterStatut, setFilterStatut] = useState("all");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedJobId && companyJobs.length > 0) {
      setSelectedJobId(companyJobs[0]._id);
    }
  }, [companyJobs, selectedJobId]);

  useEffect(() => {
    if (selectedJobId) {
      dispatch(fetchApplicationsByJob(selectedJobId));
    }
  }, [dispatch, selectedJobId]);

  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => dispatch(clearCandidatureSuccess()), 3500);
      return () => clearTimeout(t);
    }
  }, [successMessage, dispatch]);

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
    setSearchParams({ jobId });
  };

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(
      updateApplicationStatus({
        applicationId,
        statut: newStatus,
      })
    );
  };

  const currentJob = companyJobs.find((j) => j._id === selectedJobId);

  const filteredApplications = jobApplications.filter((app) => {
    if (filterStatut === "all") return true;
    return app.statut === filterStatut;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-6 h-6 text-[#00E6A5]" />
          <span>Candidatures Reçues & Classement IA</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Les candidats sont automatiquement classés par ordre décroissant de compatibilité (Smart Matching).
        </p>
      </div>

      {successMessage && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Job Selector Bar */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#00E6A5]" />
            <span>Sélectionner une offre d'emploi</span>
          </label>
          {companyJobs.length === 0 ? (
            <p className="text-xs text-[#90A1B9]">Aucune offre créée pour l'instant.</p>
          ) : (
            <select
              value={selectedJobId}
              onChange={(e) => handleJobSelect(e.target.value)}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
            >
              {companyJobs.map((j) => (
                <option key={j._id} value={j._id}>
                  {j.titre} ({j.statut}) — {j.ville}
                </option>
              ))}
            </select>
          )}
        </div>

        {currentJob && (
          <div className="text-right sm:border-l sm:border-[#374151] sm:pl-4">
            <span className="text-[10px] text-[#90A1B9] uppercase font-bold">
              Compétences requises :
            </span>
            <div className="flex flex-wrap gap-1 justify-end mt-1">
              {currentJob.competencesRequises?.map((s, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-[#00E6A5]/10 text-[#00E6A5] px-2 py-0.5 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {[
            { id: "all", label: "Toutes", count: jobApplications.length },
            {
              id: "En attente",
              label: "En attente",
              count: jobApplications.filter((a) => a.statut === "En attente").length,
            },
            {
              id: "Acceptée",
              label: "Acceptées",
              count: jobApplications.filter((a) => a.statut === "Acceptée").length,
            },
            {
              id: "Refusée",
              label: "Refusées",
              count: jobApplications.filter((a) => a.statut === "Refusée").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatut(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                filterStatut === tab.id
                  ? "bg-[#00E6A5] text-[#0B0E14] font-bold"
                  : "bg-[#161B22] text-[#90A1B9] hover:text-white border border-[#374151]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-80">({tab.count})</span>
            </button>
          ))}
        </div>

        <span className="text-xs text-[#90A1B9] flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#00E6A5]" />
          <span>Trié par Score Smart Matching décroissant</span>
        </span>
      </div>

      {/* Candidates List */}
      {loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Chargement et qualification des candidatures...
        </div>
      ) : filteredApplications.length === 0 ? (
        <Card className="text-center py-12 space-y-3">
          <Users className="w-8 h-8 text-[#90A1B9] mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-white">
            Aucune candidature pour ce filtre
          </h3>
          <p className="text-xs text-[#90A1B9]">
            Les candidatures soumises par les candidats apparaîtront ici.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app, index) => (
            <Card
              key={app._id}
              hover
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              {/* Candidate Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00E6A5]/10 border border-[#00E6A5]/30 flex items-center justify-center text-[#00E6A5] font-bold text-sm">
                    {app.candidat?.photo ? (
                      <img
                        src={app.candidat.photo}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      (app.candidat?.prenom?.[0] || "C").toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">
                        {app.candidat?.prenom} {app.candidat?.nom}
                      </h3>
                      <span className="text-[10px] text-[#90A1B9] bg-[#0B0E14] px-2 py-0.5 rounded border border-[#374151]">
                        Rang #{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {app.candidat?.email}
                      </span>
                      {app.candidat?.telephone && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            {app.candidat.telephone}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation snippet */}
                {app.lettreMotivation && (
                  <div className="bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-[#CAD5E2] leading-relaxed max-w-2xl">
                    <span className="text-[#90A1B9] font-bold block mb-1">
                      Lettre / Message d'accompagnement :
                    </span>
                    {app.lettreMotivation}
                  </div>
                )}

                <div className="text-[11px] text-[#62748E]">
                  Postulé le {formatDate(app.createdAt)}
                </div>
              </div>

              {/* Matching Score, Status & Actions */}
              <div className="flex flex-wrap lg:flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#374151]">
                <div className="flex items-center gap-2">
                  <SmartMatchingBadge score={app.scoreMatching || 0} size="md" />
                  <Badge status={app.statut} />
                </div>

                {/* CV Link */}
                {(app.cv || app.candidat?.cvUrl) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={app.cv || app.candidat?.cvUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#00E6A5] hover:underline flex items-center gap-1.5 font-semibold"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Voir le CV ↗</span>
                    </a>
                    <a
                      href={app.cv || app.candidat?.cvUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#90A1B9] hover:text-white flex items-center gap-1 font-semibold border border-[#374151] hover:border-[#00E6A5]/50 px-2 py-1 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Télécharger
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(app._id, "Acceptée")}
                    disabled={actionLoading || app.statut === "Acceptée"}
                    className="px-3.5 py-1.5 rounded-xl bg-[#00E6A5]/10 hover:bg-[#00E6A5] text-[#00E6A5] hover:text-[#0B0E14] border border-[#00E6A5]/30 text-xs font-bold transition-all flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accepter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(app._id, "Refusée")}
                    disabled={actionLoading || app.statut === "Refusée"}
                    className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Refuser</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateApplications;
