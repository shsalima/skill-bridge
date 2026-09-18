import React from 'react';

export const CompanyDashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Espace Recruteur</h1>
        <p className="text-xs text-[#90A1B9]">Pilotez vos offres et qualifiez les candidatures par Smart Matching</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0D1322] border border-[#222F46] p-5 rounded-2xl">
          <p className="text-xs text-[#90A1B9]">Offres Actives</p>
          <h3 className="text-2xl font-bold text-white mt-1">14</h3>
        </div>
        <div className="bg-[#0D1322] border border-[#222F46] p-5 rounded-2xl">
          <p className="text-xs text-[#90A1B9]">Candidatures Reçues</p>
          <h3 className="text-2xl font-bold text-[#00D5BE] mt-1">128</h3>
        </div>
        <div className="bg-[#0D1322] border border-[#222F46] p-5 rounded-2xl">
          <p className="text-xs text-[#90A1B9]">Entretiens Prévus</p>
          <h3 className="text-2xl font-bold text-white mt-1">6</h3>
        </div>
      </div>
    </div>
  );
};