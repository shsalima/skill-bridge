import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  Bell,
  User as UserIcon,
  CheckCircle2,
  ExternalLink,
  Shield,
  Briefcase,
  Layers,
} from "lucide-react";
import {
  fetchMyNotifications,
  markNotificationAsRead,
} from "../../features/notifications/notificationSlice";
import { formatDateTime } from "../../utils/formatters";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    dispatch(fetchMyNotifications());
  }, [dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    if (!notif.lu) {
      dispatch(markNotificationAsRead(notif._id));
    }
    setShowNotifications(false);
    
    if (notif.lien) {
      navigate(notif.lien);
      return;
    }

    // Default routing if lien is missing
    if (user?.role === "Candidat") {
      if (notif.type === "Offre") navigate("/candidat/jobs");
      else navigate("/candidat/applications");
    } else if (user?.role === "AdministrateurEntreprise") {
      navigate("/entreprise/applications");
    } else if (user?.role === "Administrateur") {
      navigate("/admin/complaints");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "Administrateur":
        return { label: "Super Admin", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" };
      case "AdministrateurEntreprise":
        return { label: "Entreprise", color: "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30" };
      default:
        return { label: "Candidat", color: "bg-sky-500/10 text-sky-400 border-sky-500/30" };
    }
  };

  const roleInfo = getRoleBadge(user?.role);

  const getProfilePath = (role) => {
    switch (role) {
      case "Administrateur":
        return "/admin/profil";
      case "AdministrateurEntreprise":
        return "/entreprise/profil";
      default:
        return "/candidat/profil";
    }
  };

  const profilePath = getProfilePath(user?.role);

  return (
    <header className="h-16 bg-[#0D1117] border-b border-[#374151] px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand / Logo */}
      <Link to="/" className="flex items-center gap-2.5">
        <div className="p-1.5 bg-[#00E6A5]/10 rounded-lg border border-[#00E6A5]/30">
          <div className="w-5 h-5 border-2 border-[#00E6A5] rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#00E6A5] rounded-full" />
          </div>
        </div>
        <span className="text-lg font-bold text-white tracking-tight">SkillBridge</span>
      </Link>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-[#161B22] border border-[#374151] text-[#90A1B9] hover:text-white hover:border-[#00E6A5]/40 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#161B22] border border-[#374151] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#374151] mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                      {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#90A1B9] text-center py-6">
                    Aucune notification pour le moment.
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`p-3 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 cursor-pointer hover:bg-[#1E2530] ${
                        notif.lu
                          ? "bg-[#0B0E14]/40 border-transparent text-[#90A1B9]"
                          : "bg-[#0B0E14] border-[#374151] text-white"
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{notif.titre}</span>
                          {!notif.lu && (
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#90A1B9] leading-relaxed">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-[#62748E] block">
                          {formatDateTime(notif.createdAt)}
                        </span>
                      </div>

                      {!notif.lu && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(markNotificationAsRead(notif._id));
                          }}
                          title="Marquer comme lu"
                          className="text-[#90A1B9] hover:text-[#00E6A5] transition-colors p-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill (Clickable -> Redirects to profile) */}
        <Link
          to={profilePath}
          title="Consulter mon profil"
          className="flex items-center gap-3 pl-2 border-l border-[#374151] p-1.5 rounded-xl hover:bg-[#161B22] transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#00E6A5]/10 border border-[#00E6A5]/30 group-hover:border-[#00E6A5] flex items-center justify-center text-[#00E6A5] font-bold text-xs transition-colors">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              (user?.prenom?.[0] || user?.nom?.[0] || "U").toUpperCase()
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-white group-hover:text-[#00E6A5] leading-tight transition-colors">
              {user?.prenom} {user?.nom}
            </div>
            <span
              className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded border mt-0.5 ${roleInfo.color}`}
            >
              {roleInfo.label}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
