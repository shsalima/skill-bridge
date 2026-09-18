import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { getCompanyJobs, setSelectedJob } from '../../features/entreprise/entrepriseSlice';
import { JobsFilterTabs } from '../../components/dashboard/company/JobsFilterTabs';
import { JobsHeader } from '../../components/dashboard/company/JobsHeader';
import { JobCard } from '../../components/dashboard/company/JobCard';
import { CreateJobModal } from '../../components/dashboard/company/CreateJobModal';

export const CompanyJobsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs = [], loading, error } = useSelector((state) => state.entreprise);
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCompanyJobs());
  }, [dispatch]);

  const counts = {
    total: jobs.length,
    active: jobs.filter((j) => j.statut === 'Active' || !j.statut).length,
    closed: jobs.filter((j) => j.statut === 'Clôturée').length,
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'active') return job.statut === 'Active' || !job.statut;
    if (activeTab === 'closed') return job.statut === 'Clôturée';
    return true;
  });

  const handleViewPublicPage = (job) => {
    dispatch(setSelectedJob(job));
    navigate(`/jobs/${job._id || job.id}`);
  };

  return (
    <div className="space-y-6 text-white">

      <JobsHeader onOpenModal={() => setIsModalOpen(true)} />

   
      <JobsFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

      {loading && <div className="text-xs text-[#90A1B9] py-8 text-center">Chargement des offres...</div>}
      {error && <div className="text-xs text-red-400 py-4">{error}</div>}

     
      {!loading && (
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-8 text-center text-xs text-[#90A1B9]">
              Aucune offre d'emploi trouvée dans cette catégorie.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} onViewPublic={handleViewPublicPage} />
            ))
          )}
        </div>
      )}

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};