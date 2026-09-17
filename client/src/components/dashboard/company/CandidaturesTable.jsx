// src/components/dashboard/company/CandidaturesTable.jsx
import React from 'react';
import { Eye, Check, X, Sparkles, ChevronRight } from 'lucide-react';

export const CandidaturesTable = ({ applications = [], onViewCandidate, onStatusChange }) => {
  // Mock fallback data
  const defaultApplications = [
    {
      id: "app-1",
      candidateName: "Youssef El Amrani",
      jobTitle: "Développeur Fullstack Senior",
      matchScore: 94,
      appliedDate: "Il y a 2h",
      status: "EN_ATTENTE",
      skills: ["React", "Node.js", "Docker"]
    },
    {
      id: "app-2",
      candidateName: "Sarah Mansouri",
      jobTitle: "DevOps Engineer",
      matchScore: 89,
      appliedDate: "Hier",
      status: "ACCEPTE",
      skills: ["Kubernetes", "AWS", "CI/CD"]
    },
    {
      id: "app-3",
      candidateName: "Karim Benjelloun",
      jobTitle: "UI/UX Designer",
      matchScore: 76,
      appliedDate: "Il y a 3 jours",
      status: "REFUSE",
      skills: ["Figma", "Tailwind", "User Research"]
    }
  ];

  const list = applications.length > 0 ? applications : defaultApplications;

  const getScoreColor = (score) => {
    if (score >= 85) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (score >= 70) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    return "text-red-400 bg-red-500/10 border-red-500/30";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACCEPTE':
        return <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">Accepté</span>;
      case 'REFUSE':
        return <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md font-medium">Refusé</span>;
      default:
        return <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">En attente</span>;
    }
  };

  return (
    <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Candidatures Récentes
            <span className="text-xs font-normal bg-[#00D5BE]/10 text-[#00D5BE] px-2 py-0.5 rounded-full border border-[#00D5BE]/20">
              Smart Matched
            </span>
          </h3>
          <p className="text-xs text-[#90A1B9]">Les meilleurs profils filtrés selon vos exigences techniques</p>
        </div>
        <a href="#candidatures" className="text-xs text-[#00D5BE] hover:underline flex items-center gap-1">
          Voir tout <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#222F46] text-[11px] font-semibold text-[#90A1B9] uppercase tracking-wider">
              <th className="pb-3 px-3">Candidat</th>
              <th className="pb-3 px-3">Poste Visé</th>
              <th className="pb-3 px-3">Smart Match</th>
              <th className="pb-3 px-3">Statut</th>
              <th className="pb-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222F46]/50 text-xs text-white">
            {list.map((item) => (
              <tr key={item.id} className="hover:bg-[#121B2E]/50 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-white">{item.candidateName}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="text-[9px] bg-[#080C14] text-[#90A1B9] border border-[#222F46] px-1.5 py-0.2 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-[#CAD5E2]">{item.jobTitle}</td>
                <td className="py-3.5 px-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border ${getScoreColor(item.matchScore)}`}>
                    <Sparkles className="w-3 h-3" /> {item.matchScore}%
                  </span>
                </td>
                <td className="py-3.5 px-3">{getStatusBadge(item.status)}</td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewCandidate && onViewCandidate(item)}
                      className="p-1.5 bg-[#080C14] hover:bg-[#222F46] border border-[#222F46] text-[#90A1B9] hover:text-white rounded-lg transition-all"
                      title="Voir le profil"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onStatusChange && onStatusChange(item.id, 'ACCEPTE')}
                      className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all"
                      title="Accepter"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onStatusChange && onStatusChange(item.id, 'REFUSE')}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                      title="Refuser"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};