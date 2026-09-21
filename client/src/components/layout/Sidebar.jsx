import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  Sparkles,
  AlertTriangle,
  UserCheck,
  Building2,
  Users,
  ShieldCheck,
  LogOut,
  Bookmark,
} from "lucide-react";
import { logoutUser } from "../../features/auth/authSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const candidatLinks = [
    { label: "Dashboard", path: "/candidat/dashboard", icon: LayoutDashboard },
    { label: "Offres & Smart Matching", path: "/candidat/jobs", icon: Briefcase },
    { label: "Mes Candidatures", path: "/candidat/applications", icon: FileCheck2 },
    { label: "Offres Enregistrées", path: "/candidat/saved-jobs", icon: Bookmark },
    { label: "Recommandations", path: "/candidat/recommendations", icon: Sparkles },
    { label: "Réclamations", path: "/candidat/complaints", icon: AlertTriangle },
    { label: "Mon Profil", path: "/candidat/profil", icon: UserCheck },
  ];

  const entrepriseLinks = [
    { label: "Dashboard", path: "/entreprise/dashboard", icon: LayoutDashboard },
    { label: "Mes Offres", path: "/entreprise/jobs", icon: Briefcase },
    { label: "Candidatures Reçues", path: "/entreprise/applications", icon: Users },
    { label: "Profil Entreprise", path: "/entreprise/profil", icon: Building2 },
  ];

  const adminLinks = [
    { label: "Dashboard (Stats)", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Gestion Utilisateurs", path: "/admin/users", icon: Users },
    { label: "Gestion Entreprises", path: "/admin/companies", icon: Building2 },
    { label: "Gestion Offres", path: "/admin/jobs", icon: Briefcase },
    { label: "Gestion Réclamations", path: "/admin/complaints", icon: ShieldCheck },
    { label: "Mon Profil", path: "/admin/profil", icon: UserCheck },
  ];

  let navLinks = candidatLinks;
  if (role === "AdministrateurEntreprise") {
    navLinks = entrepriseLinks;
  } else if (role === "Administrateur") {
    navLinks = adminLinks;
  }

  return (
    <aside className="w-64 bg-[#0D1117] border-r border-[#374151] flex flex-col justify-between p-4 shrink-0 fixed top-16 bottom-0 left-0 overflow-y-auto">
      <div className="space-y-6">
        <div className="px-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#62748E]">
            Menu {role === "Administrateur" ? "Administration" : role === "AdministrateurEntreprise" ? "Recruteur" : "Candidat"}
          </p>
        </div>

        <nav className="space-y-1.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#00E6A5]/10 text-[#00E6A5] border border-[#00E6A5]/25 shadow-[0_0_15px_rgba(0,230,165,0.1)]"
                      : "text-[#90A1B9] hover:bg-[#161B22] hover:text-white"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Logout Button replaces the former SkillBridge Pro card */}
      <div className="pt-4 border-t border-[#374151]">
        <button
          type="button"
          onClick={handleLogout}
          title="Se déconnecter"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#90A1B9] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-red-400" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
