// src/components/dashboard/company/StatsCards.jsx
import React from 'react';
import { Briefcase, Users, CheckCircle2, TrendingUp } from 'lucide-react';

export const StatsCards = ({ stats }) => {
  const data = stats || {
    activeJobs: 6,
    totalApplications: 148,
    acceptedCandidates: 24,
    averageMatchScore: 88,
  };

  const cards = [
    {
      title: "Offres Actives",
      value: data.activeJobs,
      icon: Briefcase,
      badge: "+2 ce mois",
      color: "text-[#00D5BE]",
      bgColor: "bg-[#00D5BE]/10",
      borderColor: "border-[#00D5BE]/20",
    },
    {
      title: "Candidatures Reçues",
      value: data.totalApplications,
      icon: Users,
      badge: "+18%",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Candidats Retenus",
      value: data.acceptedCandidates,
      icon: CheckCircle2,
      badge: "16% conversion",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Score Smart Match Moyen",
      value: `${data.averageMatchScore}%`,
      icon: TrendingUp,
      badge: "Haute précision",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-[#0D1322] border border-[#222F46] rounded-xl p-5 hover:border-[#00D5BE]/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${card.bgColor} ${card.color} ${card.borderColor} border`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-[#90A1B9] bg-[#080C14] border border-[#222F46] px-2 py-0.5 rounded-full">
                {card.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#00D5BE] transition-colors">
              {card.value}
            </h3>
            <p className="text-xs text-[#90A1B9]">{card.title}</p>
          </div>
        );
      })}
    </div>
  );
};