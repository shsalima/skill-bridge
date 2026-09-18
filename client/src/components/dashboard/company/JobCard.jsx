import React from 'react';
import { ExternalLink, Power, Trash2, Users, Eye, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export const JobCard = ({ job, onViewPublic, onToggleStatus, onDelete, actionLoading = false }) => {
  const isClosed = job.statut === 'Fermée';
  const navigate = useNavigate();

  return (
    <div className={`bg-[#0D1322] border border-[#222F46] hover:border-[#00D5BE]/40 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
      isClosed ? 'opacity-70' : ''
    }`}>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-3">
          <h3 
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="text-base font-bold text-white hover:text-[#00D5BE] transition-colors cursor-pointer"
          >
            {job.titre}
          </h3>

          <span className={`border text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
            isClosed 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : 'bg-[#00D5BE]/10 border-[#00D5BE]/30 text-[#00D5BE]'
          }`}>
            {job.statut || 'Ouverte'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#90A1B9]">
          <span className="font-semibold text-white">{job.typeContrat || 'CDI'}</span>
          <span>•</span>
          <span>{job.ville || 'Non spécifié'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#00D5BE]" />
            <strong className="text-white">{job.candidatsCount || job.applications?.length || 0}</strong> candidats
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#00D5BE]" />
            <strong className="text-white">{job.viewsCount || 0}</strong> vues
          </span>
          {job.dateLimite && (
            <>
              <span>•</span>
              <span>
                Date limite : {new Date(job.dateLimite).toLocaleDateString('fr-FR')}
              </span>
            </>
          )}
        </div>

        {isClosed && (
          <p className="text-[11px] text-red-400/80">
            Offre clôturée — les candidats ne peuvent plus postuler.
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
        <button
          onClick={() => onViewPublic(job)}
          className="bg-[#080C14] hover:bg-[#161F30] border border-[#222F46] text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#90A1B9]" />
          <span>Page publique</span>
        </button>

        <button 
          onClick={() => onToggleStatus && onToggleStatus(job)}
          disabled={actionLoading}
          title={isClosed ? "Réactiver l'offre" : "Clôturer l'offre"}
          className={`bg-[#080C14] hover:bg-[#161F30] border border-[#222F46] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isClosed ? 'text-[#00D5BE]' : 'text-[#EAB308]'
          }`}
        >
          {actionLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Power className="w-3.5 h-3.5" />
          )}
          <span>{isClosed ? 'Réactiver' : 'Clôturer'}</span>
        </button>

        <button 
            onClick={() => onDelete && onDelete(job._id || job.id)}
            disabled={actionLoading}
            className="bg-[#080C14] hover:bg-red-500/10 border border-[#222F46] hover:border-red-500/30 text-[#90A1B9] hover:text-red-400 p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Supprimer l'offre"
            >
            <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};