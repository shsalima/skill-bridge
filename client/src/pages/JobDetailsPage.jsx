import React, { useEffect } from 'react';
// import { useParams, useNavigate, Link } from react-router; // أو react-router-dom
import { useDispatch, useSelector } from 'react-redux';
import { 
  Briefcase, MapPin, Building2, Calendar, DollarSign, 
  Clock, ArrowLeft, CheckCircle2, Send, Share2, AlertCircle 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth || {});
  const { currentJob: job, loading, error } = useSelector((state) => state.jobs || {});

  useEffect(() => {
    if (id) {
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00D5BE] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Offre introuvable</h2>
        <p className="text-sm text-[#90A1B9] mb-6">L'offre que vous cherchez n'existe pas ou a été supprimée.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-[#222F46] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
      </div>
    );
  }

  const isOwner = user && user._id === job.entreprise?._id;
  const isCandidate = user && user.role === 'Candidat';

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Back */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs text-[#90A1B9] hover:text-[#00D5BE] transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux offres
        </button>

        {/* Main Header Card */}
        <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Enterprise Logo + Info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#161F30] border border-[#222F46] flex items-center justify-center shrink-0">
                {job.entreprise?.photo ? (
                  <img src={job.entreprise.photo} alt="Company Logo" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Building2 className="w-8 h-8 text-[#00D5BE]" />
                )}
              </div>

              <div>
                <span className="inline-block bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] text-[11px] font-medium px-2.5 py-0.5 rounded-md mb-2">
                  {job.domaine || "Informatique"}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">{job.titre}</h1>
                <p className="text-sm text-[#90A1B9] font-medium flex items-center gap-2">
                  {job.entreprise?.nom || "Entreprise Confidentielle"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 self-end md:self-center">
              {isCandidate && (
                <button 
                  className="bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,213,190,0.2)]"
                >
                  <Send className="w-4 h-4" /> Postuler Maintenant
                </button>
              )}

              {isOwner && (
                <button 
                  onClick={() => navigate(`/dashboard/company/jobs/edit/${job._id}`)}
                  className="bg-[#222F46] hover:bg-[#222F46]/80 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-all border border-[#222F46]"
                >
                  Modifier l'offre
                </button>
              )}
            </div>

          </div>

          {/* Quick Meta Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#222F46]/60 text-xs text-[#90A1B9]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00D5BE]" />
              <span>{job.ville} ({job.modalite})</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#00D5BE]" />
              <span>Contrat {job.typeContrat}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#00D5BE]" />
              <span>{job.salaireMin && job.salaireMax ? `${job.salaireMin} - ${job.salaireMax} DH` : "Négociable"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00D5BE]" />
              <span>Expire le: {new Date(job.dateLimite).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Description & Skills */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description Card */}
            <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Description du Poste</h3>
              <p className="text-xs sm:text-sm text-[#90A1B9] leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Required Skills Card */}
            <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Compétences Requises</h3>
              <div className="flex flex-wrap gap-2">
                {job.competencesRequises?.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-[#161F30] border border-[#222F46] text-[#00D5BE] text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Overview Card */}
          <div className="space-y-6">
            <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-[#222F46] pb-3">Aperçu de l'offre</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#222F46]/40">
                  <span className="text-[#90A1B9]">Date de publication</span>
                  <span className="text-white font-medium">{new Date(job.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222F46]/40">
                  <span className="text-[#90A1B9]">Statut</span>
                  <span className="text-[#00D5BE] font-medium">{job.statut || "Ouverte"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222F46]/40">
                  <span className="text-[#90A1B9]">Secteur</span>
                  <span className="text-white font-medium">{job.domaine}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};