import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Sparkles,
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { fetchJobs } from "../../features/offres/offreSlice";
import { formatDate, formatSalary } from "../../utils/formatters";

export const Recommendations = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, loading } = useSelector((state) => state.offres);

  const candidateSkills = user?.competences || user?.skills || [];

  useEffect(() => {
    dispatch(fetchJobs({ statut: "Ouverte" }));
  }, [dispatch]);

  // Compute by simple skill overlap count (no smart matching percentage)
  const recommendedJobs = jobs
    .map((job) => {
      const jobSkills = job.competencesRequises || job.skillsRequired || job.competences || [];
      const overlapCount = jobSkills.filter((s) =>
        candidateSkills.some((cs) => cs.toLowerCase().trim() === s.toLowerCase().trim())
      ).length;
      return { ...job, overlapCount };
    })
    .filter((job) => job.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-[#00E6A5]" />
          <span>Recommandations Personnalisées</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Sélection exclusive des postes partageant des compétences avec votre profil.
        </p>
      </div>

      {candidateSkills.length === 0 ? (
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 text-center py-12 space-y-3">
          <Sparkles className="w-8 h-8 text-[#00E6A5] mx-auto opacity-70" />
          <h3 className="text-sm font-bold text-white">
            Vos compétences n'ont pas encore été renseignées
          </h3>
          <p className="text-xs text-[#90A1B9] max-w-md mx-auto">
            Pour générer des recommandations IA pertinentes, ajoutez vos compétences techniques sur votre page de profil.
          </p>
          <Link
            to="/candidat/profile"
            className="inline-block mt-2 px-4 py-2 bg-[#00E6A5] text-[#0B0E14] text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(0,230,165,0.25)]"
          >
            Configurer mes compétences
          </Link>
        </div>
      ) : loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Analyse des offres en cours...
        </div>
      ) : recommendedJobs.length === 0 ? (
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 text-center py-12 space-y-3">
          <Briefcase className="w-8 h-8 text-[#90A1B9] mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-white">
            Aucune recommandation disponible pour le moment
          </h3>
          <p className="text-xs text-[#90A1B9]">
            Enrichissez votre profil avec de nouvelles compétences ou parcourez la liste complète des offres.
          </p>
          <Link
            to="/candidat/jobs"
            className="inline-block text-xs font-bold text-[#00E6A5] hover:underline"
          >
            Voir toutes les offres disponibles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 hover:border-[#00E6A5]/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#90A1B9] bg-[#0B0E14] px-2 py-0.5 rounded border border-[#374151]">
                    {job.typeContrat}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {job.titre}
                  </h3>
                  <p className="text-xs text-[#90A1B9] mt-0.5">
                    {job.entreprise?.nomEntreprise || "Entreprise confidentielle"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00E6A5]" />
                    {job.ville}
                  </span>
                  <span>•</span>
                  <span>{formatSalary(job.salaire)}</span>
                </div>

                {/* Overlapping skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.competencesRequises?.map((skill, idx) => {
                    const hasSkill = candidateSkills.some(
                      (cs) => cs.toLowerCase().trim() === skill.toLowerCase().trim()
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
                </div>
              </div>

              <div className="pt-3 border-t border-[#374151]">
                <Link
                  to={`/candidat/jobs/${job._id}`}
                  className="w-full py-2 bg-[#0B0E14] hover:bg-[#00E6A5] hover:text-[#0B0E14] text-[#00E6A5] border border-[#00E6A5]/30 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Consulter & Postuler</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
