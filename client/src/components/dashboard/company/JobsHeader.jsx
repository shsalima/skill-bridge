import React from 'react';
import { Plus } from 'lucide-react';

export const JobsHeader = ({ onOpenModal }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          Gestion des offres d'emploi
        </h1>
        <p className="text-xs sm:text-sm text-[#90A1B9] mt-1">
          Pilotez les annonces publiées et suivez le flux de candidatures.
        </p>
      </div>

      <button
        onClick={onOpenModal}
        className="bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,213,190,0.2)] self-start sm:self-auto"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Créer une nouvelle offre</span>
      </button>
    </div>
  );
};