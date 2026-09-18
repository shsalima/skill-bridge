import React from "react";
import {
  MapPin,
  Briefcase,
  Euro,
  Clock,
  Share2,
  Bookmark,
  CheckCircle,
  Calendar,
  Users,
} from "lucide-react";

export const JobHeaderCard = ({ selectedJob, selectedJobEntreprise }) => {
  return (
    <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-[#161F30] border border-[#222F46] rounded-xl flex items-center justify-center text-[#00D5BE] font-bold text-xl shrink-0 overflow-hidden uppercase">
            {selectedJob?.titre?.trim()[0]}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#90A1B9]">
                {selectedJobEntreprise?.nomEntreprise}
              </span>
              <span className="bg-[#00D5BE]/10 text-[#00D5BE] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#00D5BE]/20">
                Entreprise Vérifiée
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {selectedJob?.titre}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* <button className="p-2.5 bg-[#080C14] hover:bg-[#161F30] border border-[#222F46] rounded-xl text-[#90A1B9] hover:text-white transition-all">
            <Share2 className="w-4 h-4" />
          </button> */}
          <button className="p-2.5 bg-[#080C14] hover:bg-[#161F30] border border-[#222F46] rounded-xl text-[#00D5BE] transition-all">
            <Bookmark className="w-4 h-4 fill-[#00D5BE]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#00D5BE] text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[11px] text-[#90A1B9]">Localisation</span>
          </div>
          <p className="text-xs font-bold text-white truncate">
            {selectedJob?.ville}
          </p>
        </div>

        <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#00D5BE] text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="text-[11px] text-[#90A1B9]">Contrat</span>
          </div>
          <p className="text-xs font-bold text-white">
            {selectedJob?.typeContrat}
          </p>
        </div>

        <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#00D5BE] text-xs">
            <Euro className="w-3.5 h-3.5" />
            <span className="text-[11px] text-[#90A1B9]">Rémunération</span>
          </div>
          <p className="text-xs font-bold text-white">
            {selectedJob?.salaireMin && selectedJob?.salaireMax
              ? `${selectedJob?.salaireMin / 1000}k - ${selectedJob?.salaireMax / 1000}k DH / an`
              : "65k - 78k € / an"}
          </p>
        </div>

        {/* <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[#00D5BE] text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[11px] text-[#90A1B9]">Expérience</span>
          </div>
          <p className="text-xs font-bold text-white">{job.experience}</p>
        </div> */}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-4 text-xs text-[#90A1B9]">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Date limite :{" "}
            {selectedJob?.dateLimite
              ? new Date(selectedJob?.dateLimite).toLocaleDateString("fr-FR")
              : "N/A"}{" "}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {selectedJob?.applications?.length} candidatures
          </span>
        </div>

        <div className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Candidature déjà transmise</span>
        </div>
      </div>
    </div>
  );
};
