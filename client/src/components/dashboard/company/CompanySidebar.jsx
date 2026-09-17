import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Search, 
  Building2, 
  Bell, 
  Plus, 
  ExternalLink, 
  LogOut, 
  CheckCircle2 
} from 'lucide-react';

export const CompanySidebar = ({ activeTab, setActiveTab, onOpenCreateJob }) => {
  const dispatch = useDispatch();
  
const entrepriseState = useSelector((state) => state.entreprise) || {};
const companyInfo = entrepriseState.companyInfo;
const jobs = entrepriseState.jobs || [];  const activeJobsCount = jobs?.filter(job => job.status !== 'Fermée')?.length || 0;

  // 2. Navigation items definition
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'offres', label: "Offres d'emploi", icon: Briefcase, badge: activeJobsCount },
    { id: 'candidatures', label: 'Candidatures', icon: Users },
    { id: 'candidates', label: 'Base Candidats', icon: Search },
    { id: 'profile', label: 'Profil entreprise', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleLogout = () => {
  };

  return (
    <aside className="w-64 bg-[#0D1322] border-r border-[#222F46] flex flex-col justify-between p-4 fixed h-full z-20 top-0 left-0">
      <div>
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="p-2 bg-[#00D5BE]/10 rounded-xl border border-[#00D5BE]/30">
            <div className="w-5 h-5 border-2 border-[#00D5BE] rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#00D5BE] rounded-full" />
            </div>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SkillBridge</span>
          <span className="text-[10px] bg-[#00D5BE]/10 text-[#00D5BE] font-bold px-1.5 py-0.5 rounded uppercase">Recruteur</span>
        </div>

        {/* Company Quick Info Card */}
        <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-[#00D5BE]/20 rounded-lg flex items-center justify-center text-[#00D5BE] font-bold text-xs uppercase">
              {companyInfo?.nomEntreprise?.substring(0, 2) || "CS"}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                {companyInfo?.nomEntreprise || "CloudScale Techno.."} 
                <CheckCircle2 className="w-3 h-3 text-[#00D5BE] shrink-0" />
              </h4>
              <p className="text-[10px] text-[#90A1B9] truncate">
                {companyInfo?.adresse || "Casablanca"} • {companyInfo?.taille || "10-50"} emp.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#90A1B9] mt-2 pt-2 border-t border-[#222F46]/50">
            <span>Offres actives : <strong className="text-white">{activeJobsCount}</strong></span>
            <button 
              onClick={() => setActiveTab('offres')}
              className="text-[#00D5BE] hover:underline flex items-center gap-0.5 text-[10px]"
            >
              Gérer <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Publier une offre Button */}
        <button 
          onClick={onOpenCreateJob}
          className="w-full bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all mb-6 shadow-[0_0_15px_rgba(0,213,190,0.2)]"
        >
          <Plus className="w-4 h-4" /> Publier une offre
        </button>

        {/* Dynamic Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? "bg-[#00D5BE]/10 text-[#00D5BE] font-medium border border-[#00D5BE]/20"
                    : "text-[#90A1B9] hover:bg-[#182232] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
                {item.badge !== undefined && (
                  <span className={`font-bold text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-[#00D5BE] text-[#080C14]" : "bg-[#222F46] text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 text-[#90A1B9] hover:text-red-400 transition-all text-xs font-medium w-full text-left"
      >
        <LogOut className="w-4 h-4" /> Déconnexion
      </button>
    </aside>
  );
};