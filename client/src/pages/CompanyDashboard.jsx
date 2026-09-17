// src/pages/CompanyDashboard.jsx
import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCompanyJobs } from '../redux/slices/entrepriseSlice';

import { CompanySidebar } from '../components/dashboard/company/CompanySidebar';
import { CompanyHeader } from '../components/dashboard/company/CompanyHeader';
import { HeroBanner } from '../components/dashboard/company/HeroBanner';
import { StatsCards } from '../components/dashboard/company/StatsCards';
import { CandidaturesTable } from '../components/dashboard/company/CandidaturesTable';
import { ActiveJobsGrid } from '../components/dashboard/company/ActiveJobsGrid';
import { CreateJobModal } from '../components/dashboard/company/CreateJobModal';
import { getCompanyJobs } from '../features/entreprise/entrepriseSlice';

const CompanyDashboard = () => {
  const dispatch = useDispatch();

  // 1. Navigation & Modal States
  const [activeTab, setActiveTab] = useState('offres'); // تقدر ديري 'dashboard'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Redux Data
  const { companyInfo, stats, applications, jobs, loading, error } = useSelector(
    (state) => state.entreprise || {}
  );

  // 3. Fetch Initial Data
  useEffect(() => {
    dispatch(getCompanyJobs());
  }, [dispatch]);

  // Handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCandidateStatusChange = (appId, newStatus) => {
    dispatch(updateCandidateStatus({ appId, status: newStatus }));
  };

  return (
    <div className="flex min-h-screen bg-[#080C14] text-[#CAD5E2]">
      {/* Sidebar with Modal Trigger */}
      <CompanySidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCreateJob={handleOpenModal} 
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <CompanyHeader onCreateJob={handleOpenModal} companyInfo={companyInfo} />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-xs">
            {error}
          </div>
        )}

        {/* Tab: Dashboard */}
        {activeTab === 'dashboard' && (
          <>
            <HeroBanner companyName={companyInfo?.nomEntreprise} onCreateJob={handleOpenModal} />
            <StatsCards stats={stats} />
            <CandidaturesTable 
              applications={applications} 
              onStatusChange={handleCandidateStatusChange} 
            />
            <ActiveJobsGrid jobs={jobs} onCreateJob={handleOpenModal} />
          </>
        )}

        {/* Tab: Offres */}
        {activeTab === 'offres' && (
          <div className="bg-[#0D1322] border border-[#222F46] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2">Gestion des Offres d'Emploi</h2>
            <p className="text-xs text-[#90A1B9] mb-4">
              Ici s'affichera la liste complète de vos offres d'emploi avec options d'édition.
            </p>
            {/* غادي نحطو مكون قائمة العروض هنا فـ الخطوة الجاية */}
          </div>
        )}

        {/* Tab: Candidatures */}
        {activeTab === 'candidatures' && (
          <div className="bg-[#0D1322] border border-[#222F46] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-2">Toutes les Candidatures</h2>
            <p className="text-xs text-[#90A1B9]">
              Affiche l'ensemble des postulants triés par Smart Matching Score.
            </p>
          </div>
        )}
      </main>

      {/* Modal Popup Create Job */}
      <CreateJobModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default CompanyDashboard;