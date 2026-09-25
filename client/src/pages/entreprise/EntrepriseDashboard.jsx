import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { fetchJobs, fetchEntrepriseStats } from "../../features/offres/offreSlice";

export const EntrepriseDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, entrepriseStats, loading } = useSelector((state) => state.offres);

  useEffect(() => {
    dispatch(fetchEntrepriseStats());
    dispatch(fetchJobs());
  }, [dispatch]);

  const companyJobs = jobs.filter(
    (j) =>
      String(j.entreprise?._id || j.entreprise) === String(user?._id || user?.id)
  );
  const activeJobsCount = companyJobs.filter((j) => j.statut === "Ouverte").length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#161B22] to-[#1F2937] border border-[#374151] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E6A5] bg-[#00E6A5]/10 px-2.5 py-0.5 rounded border border-[#00E6A5]/30">
            Espace Recruteur
          </span>
          <h1 className="text-2xl font-extrabold text-white">
            Tableau de bord — {user?.nomEntreprise || user?.entreprise?.nomEntreprise || "Mon Entreprise"}
          </h1>
          <p className="text-xs text-[#90A1B9]">
            Pilotez vos offres d'emploi et évaluez les candidats en toute simplicité.
          </p>
        </div>

        <Link to="/entreprise/jobs/create">
          <button
            type="button"
            className="inline-flex items-center justify-center font-bold rounded-xl transition-all px-4 py-2.5 text-xs gap-2 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publier une offre</span>
          </button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Offres créées</span>
            <Briefcase className="w-4 h-4 text-[#00E6A5]" />
          </div>
          <p className="text-2xl font-bold text-white">
            {entrepriseStats.totalJobs || companyJobs.length}
          </p>
          <span className="text-[11px] text-[#62748E]">Total annonces</span>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Offres Actives</span>
            <TrendingUp className="w-4 h-4 text-[#00E6A5]" />
          </div>
          <p className="text-2xl font-bold text-[#00E6A5]">{activeJobsCount}</p>
          <span className="text-[11px] text-[#62748E]">Ouvertes aux candidatures</span>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Candidatures</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-white">
            {entrepriseStats.totalApplications || 0}
          </p>
          <span className="text-[11px] text-[#62748E]">Reçues au total</span>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Statut Candidatures</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            {entrepriseStats.statusBreakdown?.map((item) => (
              <span
                key={item._id}
                className="text-xs font-bold text-white bg-[#0B0E14] px-2 py-0.5 rounded border border-[#374151]"
              >
                {item._id} : {item.count}
              </span>
            )) || <span className="text-xs text-[#90A1B9]">En attente</span>}
          </div>
          <span className="text-[11px] text-[#62748E]">Répartition</span>
        </div>
      </div>

      {/* Quick Actions & Recent Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Vos offres récentes</h2>
            <p className="text-xs text-[#90A1B9]">Accès rapide à la gestion des offres</p>
          </div>
          <Link
            to="/entreprise/jobs"
            className="text-xs text-[#00E6A5] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Gérer toutes mes offres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {companyJobs.slice(0, 3).map((job) => (
            <div
              key={job._id}
              className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 hover:border-[#00E6A5]/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      job.statut === "Ouverte"
                        ? "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}
                  >
                    {job.statut}
                  </span>
                  <span className="text-xs text-[#90A1B9]">{job.typeContrat}</span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{job.titre}</h3>
                <p className="text-xs text-[#90A1B9]">{job.ville} • {job.domaine}</p>
              </div>

              <Link
                to={`/entreprise/applications?jobId=${job._id}`}
                className="w-full py-2 bg-[#0B0E14] hover:bg-[#161B22] border border-[#374151] rounded-xl text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-[#00E6A5]" />
                <span>Voir les candidatures</span>
              </Link>
            </div>
          ))}
          {companyJobs.length === 0 && (
            <div className="col-span-3 bg-[#161B22] border border-[#374151] rounded-2xl p-8 text-center text-xs text-[#90A1B9] space-y-3">
              <p>Vous n'avez pas encore publié d'offres d'emploi.</p>
              <Link to="/entreprise/jobs/create">
                <button
                  type="button"
                  className="inline-flex items-center justify-center font-bold rounded-xl transition-all px-3 py-1.5 text-xs gap-1.5 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Créer ma première offre</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntrepriseDashboard;
