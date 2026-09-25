import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Search,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  Bookmark,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  X,
} from "lucide-react";
import { fetchJobs } from "../../features/offres/offreSlice";
import { toggleSavedJob, fetchMySavedJobs } from "../../features/candidatures/candidatureSlice";

import { formatDate, formatSalary } from "../../utils/formatters";

export const JobList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, loading } = useSelector((state) => state.offres);
  const { savedJobs } = useSelector((state) => state.candidatures);

  const candidateSkills = user?.competences;

  const [keyword, setKeyword] = useState("");
  const [domaine, setDomaine] = useState("");
  const [ville, setVille] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [minMatch, setMinMatch] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs({ statut: "Ouverte" }));
    dispatch(fetchMySavedJobs());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchJobs({
        statut: "Ouverte",
        keyword: keyword || undefined,
        domaine: domaine || undefined,
        ville: ville || undefined,
        typeContrat: typeContrat || undefined,
      })
    );
  };



  const isSaved = (jobId) => {
    return savedJobs.some((item) => (item.job?._id ) === jobId);
  };

  const handleToggleSave = (jobId, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSavedJob(jobId));
  };

  
  const filteredJobs = jobs;

  return (
    <div className="space-y-6">
     
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-[#00E6A5]" />
          <span>Offres d'Emploi & Smart Matching</span>
        </h1>
        
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-[#161B22] border border-[#374151] rounded-2xl p-4 space-y-4 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Titre du poste"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white  placeholder:text-[#62748E]"
            />
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Ville (fquih ben salah...)"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-[#62748E]"
            />
          </div>

          <div>
            <select
              value={typeContrat}
              onChange={(e) => setTypeContrat(e.target.value)}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white "
            >
              <option value="">Tous types de contrat</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Freelance">Freelance</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#374151]">


          <div className="flex items-center gap-2">
         
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#00E6A5] hover:bg-[#00C293] text-[#0B0E14] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,230,165,0.2)]"
            >
              Rechercher
            </button>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-between text-xs text-[#90A1B9]">
        <span>
          <strong className="text-white">{filteredJobs.length}</strong> 
          offre disponibles
        </span>
      
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-[#90A1B9]">
          Chargement des opportunités...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 text-center py-12 space-y-3">
          <Briefcase className="w-8 h-8 text-[#90A1B9] mx-auto opacity-50" />
          <h3 className="text-sm font-bold text-white">Aucune offre trouvée</h3>
          <p className="text-xs text-[#90A1B9]">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const saved = isSaved(job._id);
            return (
              <div
                key={job._id}
                className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 hover:border-[#00E6A5]/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#90A1B9] bg-[#0B0E14] px-2.5 py-1 rounded-md border border-[#374151]">
                        {job.typeContrat}
                      </span>
                      <span className="text-[10px] font-medium text-[#90A1B9]">
                        {job.domaine}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleToggleSave(job._id, e)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          saved
                            ? "bg-[#00E6A5]/10 border-[#00E6A5]/30 text-[#00E6A5]"
                            : "bg-[#0B0E14] border-[#374151] text-[#90A1B9] hover:text-white"
                        }`}
                        
                      >
                        <Bookmark
                          className={`w-4 h-4 ${saved ? "fill-[#00E6A5]" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#00E6A5] transition-colors line-clamp-1">
                      {job.titre}
                    </h3>
                    <p className="text-xs text-[#90A1B9] mt-0.5">
                      {job.entreprise?.nomEntreprise || "Entreprise confidentielle"}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#90A1B9] pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00E6A5]" />
                      {job.ville}
                    </span>
                    <span>•</span>
                    <span>{formatSalary(job.salaire)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Limite : {formatDate(job.dateLimite)}
                    </span>
                  </div>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.competencesRequises?.slice(0, 4).map((skill, idx) => {
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
                    {job.competencesRequises?.length > 4 && (
                      <span className="text-[10px] text-[#62748E] self-center">
                        +{job.competencesRequises.length - 4} autres
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Button */}
                <div className="pt-3 border-t border-[#374151]">
                  <Link
                    to={`/candidat/jobs/${job._id}`}
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

export default JobList;
