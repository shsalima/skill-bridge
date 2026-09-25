import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Phone,
  Mail,
  Plus,
  X,
  CheckCircle2,
  Save,
  Calendar,
  Loader2,
} from "lucide-react";
import { updateProfile, getProfile, clearSuccessMessage } from "../../features/auth/authSlice";
import { formatDate } from "../../utils/formatters";

export const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: profileLoading, successMessage } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    cvUrl: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        prenom: user.prenom || "",
        nom: user.nom || "",
        telephone: user.telephone || "",
        cvUrl: user.cvUrl || "",
      });
      setSkills(user.competences || []);
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

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        ...formData,
        competences: skills,
      })
    );
  };



  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <User className="w-6 h-6 text-[#00E6A5]" />
          <span>Profil Candidat</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Consultez et mettez à jour vos informations personnelles, vos compétences et vos expériences sur la plateforme SkillBridge.
        </p>
      </div>

      {successMessage && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-[#161B22] to-[#1F2937]">
        <div className="w-20 h-20 rounded-2xl bg-[#00E6A5]/10 border border-[#00E6A5]/30 flex items-center justify-center text-[#00E6A5] text-2xl font-bold">
          {(user?.prenom?.[0] || user?.nom?.[0] || "C").toUpperCase()}
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-bold text-white">
              {user?.prenom} {user?.nom}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E6A5]/10 text-[#00E6A5] border border-[#00E6A5]/30 flex items-center gap-1">
              <User className="w-3 h-3" />
              Candidat
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#90A1B9] pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#00E6A5]" />
              {user?.email}
            </span>
            {user?.telephone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#00E6A5]" />
                {user.telephone}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#00E6A5]" />
              Inscrit le {formatDate(user?.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#00E6A5]" />
            <span>Informations personnelles</span>
          </h2>

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
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                required
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
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Adresse email (Non modifiable)
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full bg-[#0B0E14]/50 border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-[#90A1B9] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Lien vers votre CV (PDF, Google Drive, portfolio...)
            </label>
            {formData.cvUrl ? (
              <div className="flex items-center gap-3 bg-[#0B0E14] border border-[#00E6A5]/30 rounded-xl px-3.5 py-2.5">
                <a
                  href={formData.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-xs text-[#00E6A5] hover:underline flex items-center gap-1.5 font-semibold truncate"
                >
                  <Camera className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Voir mon CV actuel ↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cvUrl: "" })}
                  className="text-[10px] text-[#90A1B9] hover:text-red-400 transition-colors font-semibold border border-[#374151] hover:border-red-500/30 px-2 py-1 rounded-lg"
                >
                  Remplacer
                </button>
              </div>
            ) : (
              <input
                type="url"
                name="cvUrl"
                placeholder="https://drive.google.com/file/mon-cv.pdf"
                value={formData.cvUrl}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] placeholder:text-[#62748E]"
              />
            )}
          </div>
        </div>

        <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Compétences & Savoir-faire</span>
            </h2>
            <span className="text-xs text-[#00E6A5] font-bold">
              {skills.length} compétences
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ajouter une compétence (React, Node.js, Python, Figma...)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
              className="flex-1 bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="inline-flex items-center justify-center font-bold rounded-xl transition-all px-3 py-1.5 text-xs gap-1.5 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 p-3 bg-[#0B0E14] border border-[#374151] rounded-xl min-h-[48px] items-center">
            {skills.length === 0 ? (
              <span className="text-xs text-[#62748E] italic">
                Aucune compétence ajoutée pour l'instant. Saisissez-en une ci-dessus.
              </span>
            ) : (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={profileLoading}
            className="inline-flex items-center justify-center font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-xs gap-2 bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg cursor-pointer"
          >
            {profileLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
};

export default Profile;
