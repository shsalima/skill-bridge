import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Users,
  Building2,
  Briefcase,
  FileCheck2,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { fetchAdminStats } from "../../features/offres/offreSlice";
import { fetchAllReclamations } from "../../features/reclamations/reclamationSlice";
import Card from "../../components/common/Card";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { adminStats, loading } = useSelector((state) => state.offres);
  const { reclamations } = useSelector((state) => state.reclamations);

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchAllReclamations());
  }, [dispatch]);

  const pendingReclamations = reclamations.filter(
    (r) => r.statut === "En attente"
  ).length;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#161B22] to-[#1F2937] border border-[#374151] rounded-3xl p-6 sm:p-8 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/30">
          Super Administration
        </span>
        <h1 className="text-2xl font-extrabold text-white">
          Tableau de bord Plateforme SkillBridge
        </h1>
        <p className="text-xs text-[#90A1B9] max-w-2xl">
          Supervisez l'ensemble de l'écosystème : utilisateurs, entreprises partenaires, offres d'emploi publiées et gestion des signalements.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Total Utilisateurs</span>
            <Users className="w-4 h-4 text-[#00E6A5]" />
          </div>
          <p className="text-2xl font-bold text-white">
            {adminStats.totalUser || 0}
          </p>
          <span className="text-[11px] text-[#62748E]">Comptes créés</span>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Candidats inscrits</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-sky-400">
            {adminStats.totalCandidats || 0}
          </p>
          <span className="text-[11px] text-[#62748E]">Chercheurs d'emploi</span>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Entreprises</span>
            <Building2 className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-400">
            {adminStats.totalEntreprise || 0}
          </p>
          <span className="text-[11px] text-[#62748E]">Recruteurs partenaires</span>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-[#90A1B9]">
            <span className="text-xs font-medium">Offres & Candidatures</span>
            <Briefcase className="w-4 h-4 text-[#00E6A5]" />
          </div>
          <p className="text-2xl font-bold text-white">
            {adminStats.totalJobs || 0}{" "}
            <span className="text-xs font-normal text-[#90A1B9]">
              ({adminStats.totalApplications || 0} candidatures)
            </span>
          </p>
          <span className="text-[11px] text-[#62748E]">Activité globale</span>
        </Card>
      </div>

      {/* Alert Card if pending reclamations */}
      {pendingReclamations > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-amber-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>
              <strong>{pendingReclamations} signalement{pendingReclamations > 1 ? "s" : ""}</strong> en attente de modération.
            </span>
          </div>
          <Link
            to="/admin/complaints"
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Traiter les signalements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Navigation Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Gestion Utilisateurs",
            desc: "Consulter et modérer les comptes candidats et recruteurs.",
            link: "/admin/users",
            icon: Users,
            color: "text-sky-400",
          },
          {
            title: "Gestion Entreprises",
            desc: "Vérifier et bloquer les entreprises frauduleuses.",
            link: "/admin/companies",
            icon: Building2,
            color: "text-purple-400",
          },
          {
            title: "Gestion Offres",
            desc: "Surveiller et retirer les annonces non conformes.",
            link: "/admin/jobs",
            icon: Briefcase,
            color: "text-[#00E6A5]",
          },
          {
            title: "Gestion Réclamations",
            desc: "Arbitrer les signalements déposés par les utilisateurs.",
            link: "/admin/complaints",
            icon: ShieldCheck,
            color: "text-amber-400",
          },
        ].map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <Card
              key={idx}
              hover
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className={`p-2.5 bg-[#0B0E14] border border-[#374151] rounded-xl w-fit ${sec.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{sec.title}</h3>
                <p className="text-xs text-[#90A1B9] leading-relaxed">
                  {sec.desc}
                </p>
              </div>

              <Link
                to={sec.link}
                className="text-xs font-bold text-[#00E6A5] hover:underline flex items-center gap-1 pt-2 border-t border-[#374151]"
              >
                <span>Accéder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
