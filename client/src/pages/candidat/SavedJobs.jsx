import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Bookmark,
  MapPin,
  Calendar,
  Briefcase,
  ArrowRight,
  Trash2,
} from "lucide-react";
import {
  fetchMySavedJobs,
  toggleSavedJob,
} from "../../features/candidatures/candidatureSlice";
import { formatDate, formatSalary } from "../../utils/formatters";

export const SavedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { savedJobs, loading } = useSelector((state) => state.candidatures);
  const candidateSkills = user?.competences || user?.skills || [];

  useEffect(() => {
    dispatch(fetchMySavedJobs());
  }, [dispatch]);

  const handleUnsave = (jobId, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSavedJob(jobId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Bookmark className="w-6 h-6 text-[#00E6A5]" />
          <span>Mes Offres Enregistrées</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Retrouvez toutes les offres que vous avez sauvegardées pour les consulter ou postuler plus tard.
        </p>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#90A1B9]">
          <strong className="text-white">{savedJobs.length}</strong> offre
          {savedJobs.length > 1 ? "s" : ""} enregistrée{savedJobs.length > 1 ? "s" : ""}
        </span>
        <Link
          to="/candidat/jobs"
          className="text-xs text-[#00E6A5] hover:underline flex items-center gap-1"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Parcourir les offres</span>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Chargement de vos offres enregistrées...
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 text-center py-16 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00E6A5]/10 border border-[#00E6A5]/20 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7 text-[#00E6A5] opacity-60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Aucune offre enregistrée</h3>
            <p className="text-xs text-[#90A1B9] max-w-sm mx-auto">
              Naviguez dans les offres et cliquez sur l'icône signet{" "}
              <Bookmark className="w-3 h-3 inline" /> pour sauvegarder vos opportunités préférées.
            </p>
          </div>
          <Link
            to="/candidat/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00E6A5] text-[#0B0E14] text-xs font-bold hover:bg-[#00C293] transition-all"
          >
            <span>Découvrir les offres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((item) => {
            const jobData = item.job || item;
            if (!jobData?._id) return null;
            return (
              <div
                key={jobData._id}
                className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 hover:border-[#00E6A5]/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {/* Top Section */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#90A1B9] bg-[#0B0E14] px-2.5 py-1 rounded-md border border-[#374151]">
                        {jobData.typeContrat}
                      </span>
                      <span className="text-[10px] font-medium text-[#90A1B9]">
                        {jobData.domaine}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleUnsave(jobData._id, e)}
                        className="p-1.5 rounded-lg border bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                        title="Retirer des favoris"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Company */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#00E6A5] transition-colors line-clamp-1">
                      {jobData.titre}
                    </h3>
                    <p className="text-xs text-[#90A1B9] mt-0.5">
                      {jobData.entreprise?.nomEntreprise || "Entreprise confidentielle"}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9] pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00E6A5]" />
                      {jobData.ville}
                    </span>
                    <span>•</span>
                    <span>{formatSalary(jobData.salaire)}</span>
                    {jobData.dateLimite && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Limite : {formatDate(jobData.dateLimite)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(jobData.competencesRequises || []).slice(0, 4).map((skill, idx) => {
                      const hasSkill = candidateSkills.some(
                        (cs) =>
                          cs.toLowerCase().trim() === skill.toLowerCase().trim()
                      );
                      return (
                        <span
                          key={idx}
                          className={`text-[11px] px-2 py-0.5 rounded-md border ${
                            hasSkill
                              ? "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30 font-semibold"
                              : "bg-[#0B0E14] text-[#90A1B9] border-[#374151]"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                    {(jobData.competencesRequises?.length || 0) > 4 && (
                      <span className="text-[10px] text-[#62748E] self-center">
                        +{jobData.competencesRequises.length - 4} autres
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Button */}
                <div className="pt-3 border-t border-[#374151]">
                  <Link
                    to={`/candidat/jobs/${jobData._id}`}
                    className="w-full py-2.5 bg-[#0B0E14] hover:bg-[#00E6A5] hover:text-[#0B0E14] text-[#00E6A5] border border-[#00E6A5]/30 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>Détails & Postuler</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
