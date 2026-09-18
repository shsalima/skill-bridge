import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  clearEntrepriseError,
  clearSuccessMessage,
  deleteJob,
  getCompanyJobs,
  setSelectedJob,
  toggleJobStatus,
} from "../../features/entreprise/entrepriseSlice";
import { JobsFilterTabs } from "../../components/dashboard/company/JobsFilterTabs";
import { JobsHeader } from "../../components/dashboard/company/JobsHeader";
import { JobCard } from "../../components/dashboard/company/JobCard";
import { CreateJobModal } from "../../components/dashboard/company/CreateJobModal";

export const CompanyJobsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, loading, actionLoading,error,successMessage, statut, totalJobs, ouverteJobs, fermelJobs } =
    useSelector((state) => state.entreprise);
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [togglingJobId, setTogglingJobId] = useState(null);


  // console.log("jobs", jobs);

  useEffect(() => {
    dispatch(getCompanyJobs({ statut }));
  }, [dispatch, statut]);

   useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => dispatch(clearSuccessMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const counts = {
    total: totalJobs,
    active: ouverteJobs,
    closed: fermelJobs,
  };

  const handleDeleteJob = (jobId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible.",
      )
    ) {
      dispatch(deleteJob(jobId));
    }
  };


  const handleToggleStatus =async (job) => {
  const jobId = job._id || job.id;
  const nextStatut = job.statut === "Fermée" ? "Ouverte" : "Fermée";
  const confirmMessage =
    nextStatut === "Fermée"
      ? "Clôturer cette offre ? Les candidats ne pourront plus y postuler."
      : "Réactiver cette offre ? Elle redeviendra ouverte aux candidatures.";

  if (window.confirm(confirmMessage)) {
      dispatch(clearEntrepriseError());
      setTogglingJobId(jobId);
      try {
        await dispatch(toggleJobStatus({ jobId, statut: nextStatut })).unwrap();
      } catch {
        // l'erreur est déjà stockée dans le state (toggleJobStatus.rejected)
      } finally {
        setTogglingJobId(null);
      }
    }
  };


  const handleViewPublicPage = (job) => {
    dispatch(setSelectedJob(job));
    navigate(`/jobs/${job._id || job.id}`);
  };

  return (
    <div className="space-y-6 text-white">
      <JobsHeader onOpenModal={() => setIsModalOpen(true)} />

      <JobsFilterTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
      />
      {successMessage && (
        <div className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] rounded-xl px-4 py-2.5 text-xs font-semibold">
          {successMessage}
        </div>
      )}

      {loading && (
        <div className="text-xs text-[#90A1B9] py-8 text-center">
          Chargement des offres...
        </div>
      )}
      {error && <div className="text-xs text-red-400 py-4">{error}</div>}

      {!loading && (
        <div className="space-y-3">
          {jobs.length === 0 ? (
            <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-8 text-center text-xs text-[#90A1B9]">
              Aucune offre d'emploi trouvée dans cette catégorie.
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard
                key={job._id || job.id}
                job={job}
                onViewPublic={handleViewPublicPage}
                onDelete={handleDeleteJob}
                onToggleStatus={handleToggleStatus}
                 actionLoading={
                  actionLoading && togglingJobId === (job._id)
                }
              />
            ))
          )}
        </div>
      )}

      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
