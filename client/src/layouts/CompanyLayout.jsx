import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { 
  LayoutDashboard, Briefcase, Users, Search, 
  Building2, Bell, LogOut, Plus 
} from 'lucide-react';
import { CreateJobModal } from '../components/dashboard/company/CreateJobModal';
// import { CreateJobModal } from '../components/entreprise/CreateJobModal';

export const CompanyLayout = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard/entreprise", icon: LayoutDashboard, end: true },
    { label: "Offres d'emploi", path: "/dashboard/entreprise/jobs", icon: Briefcase },
  ];

  return (
    <div className="flex min-h-screen bg-[#080C14] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1322] border-r border-[#222F46] flex flex-col justify-between p-4 shrink-0 fixed h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-xl bg-[#00D5BE]/10 border border-[#00D5BE]/30 flex items-center justify-center text-[#00D5BE] font-bold">
              ❖
            </div>
            <span className="text-lg font-bold text-white">SkillBridge</span>
            <span className="text-[10px] bg-[#00D5BE]/10 text-[#00D5BE] px-2 py-0.5 rounded font-bold uppercase ml-auto">
              Recruteur
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Publier une offre
          </button>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#00D5BE]/10 text-[#00D5BE] border border-[#00D5BE]/20"
                        : "text-[#90A1B9] hover:bg-[#161F30] hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-xs text-[#90A1B9] hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>

      <CreateJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};