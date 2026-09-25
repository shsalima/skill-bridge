import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {Briefcase,FileCheck2,Clock,CheckCircle2,Bookmark,ArrowRight,MapPin} from "lucide-react";
import { fetchJobs } from "../../features/offres/offreSlice";
import {fetchMyApplications,fetchMySavedJobs} from "../../features/candidatures/candidatureSlice";
import { formatDate, formatSalary, getStatusBadge } from "../../utils/formatters";

export const CandidatDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, loading: jobsLoading } = useSelector((state) => state.offres);
  const { myApplications, savedJobs, loading: appsLoading } = useSelector(
    (state) => state.candidatures
  );


  useEffect(() => {
    dispatch(fetchJobs({ statut: "Ouverte" }));
    dispatch(fetchMyApplications());
    dispatch(fetchMySavedJobs());
  }, [dispatch]);

  const acceptedCount = myApplications.filter((a) => a.statut === "Acceptée").length;
  const pendingCount = myApplications.filter((a) => a.statut === "En attente" ).length;

  const recentJobs = jobs.slice(0, 3);
  const recentApplications = myApplications.slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#161B22] to-[#1F2937] border border-[#374151] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Bonjour, {user?.prenom} {user?.nom} 
          </h1>
          
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/candidat/jobs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00E6A5] hover:bg-[#00C293] text-[#0B0E14] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,230,165,0.25)]"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explorer les offres</span>
            </Link>
            <Link
              to="/candidat/profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B0E14] hover:bg-[#161B22] border border-[#374151] text-white text-xs font-bold transition-all"
            >
              <span>Gérer mes compétences</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Candidatures</span>
            <FileCheck2 className="w-4 h-4 " />
          </div>
          <p className="text-2xl font-bold text-white">{myApplications.length}</p>
          <span className="text-[11px] ">Total envoyées</span>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Acceptées</span>
            <CheckCircle2 className="w-4 h-4 " />
          </div>
          <p className="text-2xl font-bold ">{acceptedCount}</p>
          <span className="text-[11px] ">Réponses positives</span>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">En attente</span>
            <Clock className="w-4 h-4 " />
          </div>
          <p className="text-2xl font-bold ">{pendingCount}</p>
          <span className="text-[11px] ">En cours d'étude</span>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Offres sauvegardées</span>
            <Bookmark className="w-4 h-4 " />
          </div>
          <p className="text-2xl font-bold ">{savedJobs.length}</p>
          <span className="text-[11px] ">En favoris</span>
        </div>
      </div>

   
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#00E6A5]" />
              <span>Dernières Offres d'emploi</span>
            </h2>
          </div>
          <Link
            to="/candidat/jobs"
            className="text-xs text-[#00E6A5]  flex items-center gap-1 font-semibold"
          >
            <span>Toutes les offres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobsLoading ? (
            <div className="col-span-3 text-center py-8 text-xs text-[#90A1B9]">
              Calcul des correspondances en cours...
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="col-span-3 bg-[#161B22] border border-[#374151] rounded-2xl p-8 text-center text-xs text-[#90A1B9]">
              Aucune offre d'emploi active disponible pour le moment.
            </div>
          ) : (
            recentJobs.map((job) => (
              <div key={job._id} className="bg-[#161B22] border border-[#374151] rounded-2xl p-5   flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider  px-2 py-1 rounded border border-[#374151]">
                      {job.typeContrat}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white  ">
                      {job.titre}
                    </h3>
                   
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#90A1B9]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.ville}
                    </span>
                   
                    <span>{formatSalary(job.salaire)}</span>
                  </div>
                </div>

                <Link
                  to={`/candidat/jobs/${job._id}`}
                  className="w-full py-2 bg-[#0B0E14] hover:bg-[#00E6A5] hover:text-[#0B0E14] text-[#00E6A5] border border-[#00E6A5]/30 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Consulter l'offre</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Mes dernières candidatures</h2>
        
          </div>
          <Link
            to="/candidat/applications"
            className="text-xs text-[#00E6A5]  flex items-center gap-1 font-semibold"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl overflow-hidden">
          {appsLoading ? (
            <div className="p-8 text-center text-xs text-[#90A1B9]">
              Chargement des candidatures...
            </div>
          ) : recentApplications.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#90A1B9] space-y-2">
              <p>Vous n'avez pas encore postulé à une offre.</p>
              <Link
                to="/candidat/jobs"
                className="inline-block text-[#00E6A5]  font-semibold"
              >
                Parcourir les offres disponibles
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#374151]">
              {recentApplications.map((app) => (
                <div
                  key={app._id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 "
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">
                      {app.job?.titre }
                    </h4>
                    <p className="text-[11px] text-[#90A1B9]">
                     Postulé le{" "}
                      {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(app.statut)}`}>{app.statut}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatDashboard;
