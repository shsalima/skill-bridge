import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { 
  Search, SlidersHorizontal, MapPin, Briefcase, 
  Bookmark, CheckCircle2, Sparkles, ChevronDown 
} from 'lucide-react';

export const JobsListingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state محلي للتصفية والبحث
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('smartMatch');
  const [savedJobs, setSavedJobs] = useState([]);

  // جلب العروض من Redux (أو بيانات للتجربة)
  const { jobs = [], loading } = useSelector((state) => state.jobs || {});

  const toggleBookmark = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Découvrir les opportunités</h1>
              <span className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00D5BE] animate-pulse" /> Smart Matching activé
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#90A1B9]">
              Explorez les offres d'emploi qualifiées et classées selon votre affinité de compétences.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-[#90A1B9]">
            <span>Trier par :</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0D1322] border border-[#222F46] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#00D5BE] appearance-none pr-8 cursor-pointer"
              >
                <option value="smartMatch">Compatibilité (Smart Match)</option>
                <option value="recent">Plus récentes</option>
                <option value="salary">Salaire le plus élevé</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#90A1B9] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#90A1B9] absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher un poste, une compétence (ex: React, TypeScript, Python)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0D1322] border border-[#222F46] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#62748E] focus:outline-none focus:border-[#00D5BE] transition-all"
            />
          </div>

          <button className="bg-[#0D1322] hover:bg-[#161F30] border border-[#222F46] text-white px-5 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all">
            <SlidersHorizontal className="w-4 h-4 text-[#00D5BE]" />
            <span>Filtrer les offres</span>
          </button>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-[#90A1B9] font-medium">
          <span className="text-white font-bold">{jobs.length || 6}</span> offres trouvées
        </div>

        {/* 3. Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const isSaved = savedJobs.includes(job._id);
            return (
              <div 
                key={job._id}
                className="bg-[#0D1322] border border-[#222F46] hover:border-[#00D5BE]/50 rounded-2xl p-5 flex flex-col justify-between transition-all group relative shadow-lg"
              >
                {/* Upper Card Info */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#161F30] border border-[#222F46] flex items-center justify-center overflow-hidden shrink-0">
                        {job.entreprise?.photo ? (
                          <img src={job.entreprise.photo} alt={job.entreprise?.nom} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-bold text-[#00D5BE]">{job.entreprise?.nom?.slice(0, 2) || "CO"}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-[#90A1B9] font-medium mb-0.5">{job.entreprise?.nom || "Entreprise"}</p>
                        <h3 className="text-sm font-bold text-white group-hover:text-[#00D5BE] transition-colors line-clamp-1">
                          {job.titre}
                        </h3>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => toggleBookmark(job._id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isSaved 
                          ? 'bg-[#00D5BE]/20 border-[#00D5BE] text-[#00D5BE]' 
                          : 'bg-[#080C14] border-[#222F46] text-[#90A1B9] hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#00D5BE]' : ''}`} />
                    </button>
                  </div>

                  {/* Badges Info (Ville, Contrat, Salaire) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#080C14] border border-[#222F46] text-[#90A1B9] text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00D5BE]" /> {job.ville} {job.modalite ? `(${job.modalite})` : ''}
                    </span>
                    <span className="bg-[#080C14] border border-[#222F46] text-[#90A1B9] text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#00D5BE]" /> {job.typeContrat}
                    </span>
                    {job.salaireMin && (
                      <span className="bg-[#080C14] border border-[#222F46] text-[#00D5BE] text-[11px] px-2.5 py-1 rounded-md font-medium">
                        {job.salaireMin}k - {job.salaireMax}k DH / an
                      </span>
                    )}
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.competencesRequises?.slice(0, 4).map((skill, idx) => (
                      <span 
                        key={idx}
                        className="bg-[#161F30] text-[#90A1B9] text-[11px] px-2.5 py-1 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Area */}
                <div className="pt-4 border-t border-[#222F46]/60 flex items-center justify-between gap-2">
                  
                  {/* Smart Match Score Badge */}
                  <div className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{job.matchPercentage || "94"}% compatible</span>
                  </div>

                  {/* Details & Postulé Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-xs text-[#90A1B9] hover:text-white font-medium px-2 py-1.5 transition-colors"
                    >
                      Détails
                    </button>

                    {job.hasApplied ? (
                      <span className="bg-[#00D5BE]/20 border border-[#00D5BE]/40 text-[#00D5BE] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Postulé
                      </span>
                    ) : (
                      <button
                        onClick={() => navigate(`/jobs/${job._id}`)}
                        className="bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        Postuler
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};