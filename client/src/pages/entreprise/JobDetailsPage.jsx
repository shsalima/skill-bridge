import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { JobHeaderCard } from "../../components/dashboard/company/job-details/JobHeaderCard";
import { JobDescriptionCard } from "../../components/dashboard/company/job-details/JobDescriptionCard";
import { SmartMatchingCard } from "../../components/dashboard/company/job-details/SmartMatchingCard";
import { CompanyMiniCard } from "../../components/dashboard/company/job-details/CompanyMiniCard";
import { getJobById } from "../../features/entreprise/entrepriseSlice";

// import { getJobById } from '../../features/entreprise/entrepriseSlice';
// import { JobHeaderCard } from '../../components/entreprise/job-details/JobHeaderCard';
// import { JobDescriptionCard } from '../../components/entreprise/job-details/JobDescriptionCard';
// import { SmartMatchingCard } from '../../components/entreprise/job-details/SmartMatchingCard';
// import { CompanyMiniCard } from '../../components/entreprise/job-details/CompanyMiniCard';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedJob, selectedJobEntreprise, loading, error } = useSelector(
    (state) => state.entreprise,
  );

  console.log("selejob", selectedJob);
  console.log("selectedJobEntreprise", selectedJobEntreprise);

  useEffect(() => {
    if (id) {
      dispatch(getJobById(id));
    }
  }, [dispatch, id]);

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
    // min-h-screen bg-[#080C14] كايضمن أن الصفحة كاملة تكون كحلة ومكاينش خلفية بيضاء
    <div className="min-h-screen bg-[#080C14] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Navigation */}
        <button
          onClick={() => navigate("/dashboard/entreprise/jobs")}
          className="flex items-center gap-2 text-xs font-semibold text-[#90A1B9] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux résultats
        </button>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <JobHeaderCard
              selectedJob={selectedJob}
              selectedJobEntreprise={selectedJobEntreprise}
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
