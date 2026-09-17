import React from 'react';
import { CompanySidebar } from '../components/dashboard/company/CompanySidebar';
import { CompanyHeader } from '../components/dashboard/company/CompanyHeader';
// import { HeroBanner } from '../components/dashboard/company/HeroBanner';
// import { StatsCards } from '../components/dashboard/company/StatsCards';
// import { CandidaturesTable } from '../components/dashboard/company/CandidaturesTable';
// import { ActiveJobsGrid } from '../components/dashboard/company/ActiveJobsGrid';

const CompanyDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#080C14] text-[#CAD5E2]">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-8">
        <CompanyHeader />
        {/* <HeroBanner />
        <StatsCards />
        <CandidaturesTable />
        <ActiveJobsGrid /> */}
      </main>
    </div>
  );
};

export default CompanyDashboard;