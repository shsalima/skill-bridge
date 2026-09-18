import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { JobHeaderCard } from "../../components/dashboard/company/job-details/JobHeaderCard";
import { JobDescriptionCard } from "../../components/dashboard/company/job-details/JobDescriptionCard";
import { SmartMatchingCard } from "../../components/dashboard/company/job-details/SmartMatchingCard";
import { CompanyMiniCard } from "../../components/dashboard/company/job-details/CompanyMiniCard";
import {
  clearSuccessMessage,
  getJobById,
  toggleJobStatus,
} from "../../features/entreprise/entrepriseSlice";

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedJob, selectedJobEntreprise, loading, actionLoading, error, successMessage } =
    useSelector((state) => state.entreprise);
  const { user } = useSelector((state) => state.auth);

  // l'utilisateur est-il l'entreprise propriétaire de cette offre ?
  const jobOwnerId =
    selectedJob?.entreprise?._id || selectedJob?.entreprise || null;
  const isOwner =
    user?.role === "AdministrateurEntreprise" &&
    jobOwnerId &&
    String(jobOwnerId) === String(user?._id || user?.id);

  useEffect(() => {
    if (id) {
      dispatch(getJobById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => dispatch(clearSuccessMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const handleToggleStatus = (job) => {
    const jobId = job._id || job.id;
    const nextStatut = job.statut === "Fermée" ? "Ouverte" : "Fermée";
    const confirmMessage =
      nextStatut === "Fermée"
        ? "Clôturer cette offre ? Les candidats ne pourront plus y postuler."
        : "Réactiver cette offre ? Elle redeviendra ouverte aux candidatures.";

    if (window.confirm(confirmMessage)) {
      dispatch(toggleJobStatus({ jobId, statut: nextStatut }));
    }
  };

  // sera branché sur le slice candidat plus tard
  const handleApply = (job) => {
    navigate(`/jobs/${job._id || job.id}/postuler`);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#080C14] p-8 text-center text-[#90A1B9] text-xs">
        Chargement des détails...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[#080C14] p-8 text-center text-red-400 text-xs">
        {error}
      </div>
    );
  if (!selectedJob) return null;

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Navigation */}
        <button
          onClick={() =>
            navigate(isOwner ? "/dashboard/entreprise/jobs" : "/jobs")
          }
          className="flex items-center gap-2 text-xs font-semibold text-[#90A1B9] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux résultats
        </button>

        {successMessage && (
          <div className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] rounded-xl px-4 py-2.5 text-xs font-semibold">
            {successMessage}
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <JobHeaderCard
              selectedJob={selectedJob}
              selectedJobEntreprise={selectedJobEntreprise}
              isOwner={isOwner}
              onToggleStatus={handleToggleStatus}
              actionLoading={actionLoading}
              onApply={handleApply}
              hasApplied={false}
            />
            <JobDescriptionCard description={selectedJob?.description} />
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <SmartMatchingCard
              matchScore={selectedJob?.matchScore || 96}
              skills={selectedJob?.competencesRequises}
            />
            {/* <CompanyMiniCard name={job.entrepriseNom} domaine={job.domaine} logo={job.entrepriseLogo} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};