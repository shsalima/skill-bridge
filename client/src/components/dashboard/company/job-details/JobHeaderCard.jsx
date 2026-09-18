import React from "react";
import {
  MapPin,
  Briefcase,
  Euro,
  Calendar,
  Users,
  Bookmark,
  CheckCircle,
  Lock,
  Power,
  Loader2,
  Send,
} from "lucide-react";

export const JobHeaderCard = ({
  selectedJob,
  selectedJobEntreprise,
  hasApplied = false,
  onApply,
  // entreprise
  isOwner = false,
  onToggleStatus,
  actionLoading = false,
}) => {
  const isClosed = selectedJob?.statut === "Fermée";

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

              {/* Badge de statut de l'offre */}
              <span
                className={`border text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  isClosed
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-[#00D5BE]/10 border-[#00D5BE]/30 text-[#00D5BE]"
                }`}
              >
                {selectedJob?.statut || "Ouverte"}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {selectedJob?.titre}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isOwner ? (
            <button
              onClick={() => onToggleStatus && onToggleStatus(selectedJob)}
              disabled={actionLoading}
              className={`bg-[#080C14] hover:bg-[#161F30] border border-[#222F46] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isClosed ? "text-[#00D5BE]" : "text-[#EAB308]"
              }`}
            >
              {actionLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Power className="w-3.5 h-3.5" />
              )}
              <span>{isClosed ? "Réactiver l'offre" : "Clôturer l'offre"}</span>
            </button>
          ) : (
            <button className="p-2.5 bg-[#080C14] hover:bg-[#161F30] border border-[#222F46] rounded-xl text-[#00D5BE] transition-all">
              <Bookmark className="w-4 h-4 fill-[#00D5BE]" />
            </button>
          )}
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
            {selectedJob?.salaire
              ? `${selectedJob?.salaire} DH`
              : "Non communiqué"}
          </p>
        </div>
      </div>

      {/* Bandeau d'information quand l'offre est clôturée */}
      {isClosed && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>
            {isOwner
              ? "Cette offre est clôturée : elle n'accepte plus de nouvelles candidatures."
              : "Cette offre est clôturée et n'accepte plus de candidatures."}
          </span>
        </div>
      )}

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
            {selectedJob?.applications?.length || 0} candidatures
          </span>
        </div>

        {/* Zone d'action candidat : préparée pour le rôle Candidat */}
        {!isOwner &&
          (hasApplied ? (
            <div className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Candidature déjà transmise</span>
            </div>
          ) : (
            <button
              onClick={() => onApply && onApply(selectedJob)}
              disabled={isClosed}
              title={
                isClosed
                  ? "Cette offre est clôturée"
                  : "Postuler à cette offre"
              }
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isClosed
                  ? "bg-[#161F30] border border-[#222F46] text-[#90A1B9] cursor-not-allowed"
                  : "bg-[#00D5BE] text-[#080C14] hover:bg-[#00D5BE]/90"
              }`}
            >
              {isClosed ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Offre clôturée</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Postuler</span>
                </>
              )}
            </button>
          ))}
      </div>
    </div>
  );
};