import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  Save,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { updateProfile, getProfile, clearSuccessMessage } from "../../features/auth/authSlice";
import { formatDate } from "../../utils/formatters";

export const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, successMessage, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        prenom: user.prenom || "",
        nom: user.nom || "",
        telephone: user.telephone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => dispatch(clearSuccessMessage()), 3500);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Shield className="w-6 h-6 text-purple-400" />
          <span>Profil Administrateur</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Consultez et mettez à jour les informations du compte Super Administrateur de la plateforme SkillBridge.
        </p>
      </div>

      {successMessage && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Account Overview Banner */}
      <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-[#161B22] to-[#1F2937]">
        <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl font-bold">
          {(user?.prenom?.[0] || user?.nom?.[0] || "A").toUpperCase()}
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-bold text-white">
              {user?.prenom} {user?.nom}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Super Administrateur
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#90A1B9] pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              {user?.email}
            </span>
            {user?.telephone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                {user.telephone}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              Inscrit le {formatDate(user?.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-6">
        <div className="border-b border-[#374151] pb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#00E6A5]" />
            <span>Coordonnées Personnelles</span>
          </h3>
          <p className="text-xs text-[#90A1B9] mt-0.5">
            Modifier le nom et le contact associé au compte administrateur.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#62748E] focus:outline-none focus:border-[#00E6A5] transition-colors"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#62748E] focus:outline-none focus:border-[#00E6A5] transition-colors"
                placeholder="Votre nom de famille"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-[#0B0E14]/50 border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-[#90A1B9] cursor-not-allowed opacity-80"
              />
              <span className="text-[10px] text-[#62748E] mt-1 block">
                L'adresse e-mail administrative ne peut pas être modifiée ici.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Numéro de téléphone
              </label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#62748E] focus:outline-none focus:border-[#00E6A5] transition-colors"
                placeholder="Ex: 0612345678"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-xs gap-2 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "Enregistrement..." : "Enregistrer les modifications"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
