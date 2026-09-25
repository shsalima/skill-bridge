import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  MapPin,
  Globe,
  Save,
  CheckCircle2,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Calendar,
  Loader2,
} from "lucide-react";
import { updateProfile, getProfile, clearSuccessMessage } from "../../features/auth/authSlice";
import { formatDate } from "../../utils/formatters";

export const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, successMessage, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    nomEntreprise: "",
    description: "",
    adresse: "",
    ville: "",
    siteWeb: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const ent = user.entreprise || {};
      setFormData({
        prenom: user.prenom || "",
        nom: user.nom || "",
        telephone: user.telephone || "",
        nomEntreprise: ent.nomEntreprise || user.nomEntreprise || "",
        description: ent.description || "",
        adresse: ent.adresse || "",
        ville: ent.ville || "",
        siteWeb: ent.siteWeb || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => dispatch(clearSuccessMessage()), 3500);
      return () => clearTimeout(t);
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
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Building2 className="w-6 h-6 text-[#00E6A5]" />
          <span>Profil de l'Entreprise</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Mettez en avant votre marque employeur auprès des talents qualifiés.
        </p>
      </div>

      {/* Overview Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B0E14] via-[#111827] to-[#0f172a] border border-[#1E2D3D] p-6">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-5">
          {/* Avatar / Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border-2 border-sky-500/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-sky-400">
                {(user?.entreprise?.nomEntreprise || user?.nomEntreprise || user?.prenom || "E")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="text-lg font-bold text-white truncate">
                {user?.entreprise?.nomEntreprise || user?.nomEntreprise ||
                  `${user?.prenom || ""} ${user?.nom || ""}`.trim() || "Entreprise"}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-sky-500/10 text-sky-400 border-sky-500/30 flex-shrink-0">
                <ShieldCheck className="w-3 h-3" />
                Recruteur
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {user?.email && (
                <span className="flex items-center gap-1.5 text-[11px] text-[#90A1B9]">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  {user.email}
                </span>
              )}
              {user?.telephone && (
                <span className="flex items-center gap-1.5 text-[11px] text-[#90A1B9]">
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  {user.telephone}
                </span>
              )}
              {user?.createdAt && (
                <span className="flex items-center gap-1.5 text-[11px] text-[#90A1B9]">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  Membre depuis {formatDate(user.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Info */}
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#00E6A5]" />
            <span>Fiche Entreprise</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Nom officiel de l'entreprise *
            </label>
            <input
              type="text"
              name="nomEntreprise"
              value={formData.nomEntreprise}
              onChange={handleChange}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Ville du siège *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="ville"
                  placeholder="Ex: Casablanca"
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Site Web officiel
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="url"
                  name="siteWeb"
                  placeholder="https://entreprise.ma"
                  value={formData.siteWeb}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Adresse complète
            </label>
            <input
              type="text"
              name="adresse"
              placeholder="Ex: Boulevard d'Anfa, Casablanca"
              value={formData.adresse}
              onChange={handleChange}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Présentation & Culture d'entreprise
            </label>
            <textarea
              rows={4}
              name="description"
              placeholder="Décrivez vos activités, missions et valeurs..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00E6A5] placeholder:text-[#62748E] resize-none"
            />
          </div>
        </div>

        {/* Manager Contact */}
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#00E6A5]" />
            <span>Responsable RH / Contact</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Prénom du responsable
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Nom du responsable
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Téléphone direct
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-xs gap-2 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Chargement...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Enregistrer les informations</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
