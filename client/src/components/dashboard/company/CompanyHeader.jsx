import React from 'react';
import { Plus, Bell } from 'lucide-react';

export const CompanyHeader = () => {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#222F46]/50">
      <div>
        <h2 className="text-sm font-semibold text-white">Espace Recruteur — CloudScale Technologies</h2>
        <p className="text-xs text-[#90A1B9]">Pilotez vos offres et qualifiez les candidatures par Smart Matching</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-[#00D5BE] text-[#080C14] font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 hover:bg-[#00D492] transition-all">
          <Plus className="w-3.5 h-3.5" /> Nouvelle offre
        </button>
        <div className="relative p-2 bg-[#0D1322] border border-[#222F46] rounded-lg text-[#90A1B9]">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#00D5BE] rounded-full" />
        </div>
        <div className="flex items-center gap-2 bg-[#0D1322] border border-[#222F46] p-1.5 pr-3 rounded-lg text-xs font-medium text-white">
          <div className="w-6 h-6 bg-[#00D5BE] rounded-md text-[#080C14] flex items-center justify-center font-bold text-[10px]">CS</div>
          CloudScale Techno..
        </div>
      </div>
    </header>
  );
};