import React from 'react';
import { LayoutDashboard, Briefcase, Users, Search, Building2, Bell, Plus, ExternalLink, LogOut, CheckCircle2 } from 'lucide-react';

export const CompanySidebar = () => {
  return (
    <aside className="w-64 bg-[#0D1322] border-r border-[#222F46] flex flex-col justify-between p-4 fixed h-full z-20">
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

        <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-[#00D5BE]/20 rounded-lg flex items-center justify-center text-[#00D5BE] font-bold text-xs">CS</div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                CloudScale Techno.. <CheckCircle2 className="w-3 h-3 text-[#00D5BE]" />
              </h4>
              <p className="text-[10px] text-[#90A1B9]">Paris (8e) • 80-150 employé</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#90A1B9] mt-2 pt-2 border-t border-[#222F46]/50">
            <span>Offres actives : <strong className="text-white">6</strong></span>
            <a href="#gérer" className="text-[#00D5BE] hover:underline flex items-center gap-0.5 text-[10px]">
              Gérer <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <button className="w-full bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all mb-6 shadow-[0_0_15px_rgba(0,213,190,0.2)]">
          <Plus className="w-4 h-4" /> Publier une offre
        </button>

        <nav className="space-y-1">
          <a href="#dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#00D5BE]/10 text-[#00D5BE] font-medium text-xs border border-[#00D5BE]/20">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </a>
          <a href="#offres" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[#90A1B9] hover:bg-[#182232] hover:text-white transition-all text-xs">
            <span className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> Offres d'emploi</span>
            <span className="bg-[#00D5BE] text-[#080C14] font-bold text-[10px] px-1.5 py-0.2 rounded-full">6</span>
          </a>
          <a href="#candidatures" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#90A1B9] hover:bg-[#182232] hover:text-white transition-all text-xs">
            <Users className="w-4 h-4" /> Candidatures
          </a>
          <a href="#candidates" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#90A1B9] hover:bg-[#182232] hover:text-white transition-all text-xs">
            <Search className="w-4 h-4" /> Base Candidats
          </a>
          <a href="#profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#90A1B9] hover:bg-[#182232] hover:text-white transition-all text-xs">
            <Building2 className="w-4 h-4" /> Profil entreprise
          </a>
          <a href="#notifications" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#90A1B9] hover:bg-[#182232] hover:text-white transition-all text-xs">
            <Bell className="w-4 h-4" /> Notifications
          </a>
        </nav>
      </div>

      <button className="flex items-center gap-3 px-3 py-2.5 text-[#90A1B9] hover:text-red-400 transition-all text-xs font-medium">
        <LogOut className="w-4 h-4" /> Déconnexion
      </button>
    </aside>
  );
};