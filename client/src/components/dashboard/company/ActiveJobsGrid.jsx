// src/components/dashboard/company/ActiveJobsGrid.jsx
import React from 'react';
import { MapPin, Users, Clock, MoreVertical, Plus } from 'lucide-react';

export const ActiveJobsGrid = ({ jobs = [], onCreateJob }) => {
  const defaultJobs = [
    {
      id: "job-1",
      title: "Développeur Fullstack Senior",
      location: "Paris (Hybrid)",
      type: "CDI",
      applicantsCount: 42,
      postedTime: "Il y a 3 jours",
      status: "Active"
    },
    {
      id: "job-2",
      title: "DevOps Engineer & Cloud Specialist",
      location: "Remote",
      type: "CDI",
      applicantsCount: 19,
      postedTime: "Il y a 5 jours",
      status: "Active"
    },
    {
      id: "job-3",
      title: "Lead Product Designer (UI/UX)",
      location: "Paris (On-site)",
      type: "CDI",
      applicantsCount: 28,
      postedTime: "Il y a 1 semaine",
      status: "Active"
    }
  ];

  const list = jobs.length > 0 ? jobs : defaultJobs;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white">Vos Offres d'Emploi Actives</h3>
          <p className="text-xs text-[#90A1B9]">Gérez vos annonces et suivez leur visibilité</p>
        </div>
        <button 
          onClick={onCreateJob}
          className="bg-[#0D1322] hover:bg-[#182232] border border-[#222F46] text-[#00D5BE] text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Ajouter une offre
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((job) => (
          <div 
            key={job.id} 
            className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-5 hover:border-[#00D5BE]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold text-[#00D5BE] bg-[#00D5BE]/10 border border-[#00D5BE]/20 px-2 py-0.5 rounded-full">
                  {job.type}
                </span>
                <button className="text-[#90A1B9] hover:text-white p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{job.title}</h4>

              <div className="space-y-1.5 text-xs text-[#90A1B9] mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#62748E]" /> {job.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#62748E]" /> Publié {job.postedTime}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#222F46]/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <Users className="w-4 h-4 text-[#00D5BE]" />
                <span>{job.applicantsCount} candidatures</span>
              </div>
              <button className="text-[#00D5BE] font-semibold hover:underline text-xs">
                Gérer →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};