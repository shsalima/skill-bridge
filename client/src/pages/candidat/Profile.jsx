import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Phone,
  Mail,
  Camera,
  Plus,
  X,
  Sparkles,
  GraduationCap,
  Trash2,
  CheckCircle2,
  Save,
  Calendar,
} from "lucide-react";
import { updateProfile, getProfile, clearSuccessMessage } from "../../features/auth/authSlice";
import {
  fetchMyFormations,
  addFormation,
  deleteFormation,
} from "../../features/candidatures/candidatureSlice";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { formatDate } from "../../utils/formatters";

export const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: profileLoading, successMessage } = useSelector(
    (state) => state.auth
  );
  const { formations, actionLoading: formationLoading } = useSelector(
    (state) => state.candidatures
  );

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    photo: "",
    cvUrl: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [isFormationModalOpen, setIsFormationModalOpen] = useState(false);
  const [formationData, setFormationData] = useState({
    titre: "",
    etablissement: "",
    anneeDebut: "",
    anneeFin: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchMyFormations());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        prenom: user.prenom || "",
        nom: user.nom || "",
        telephone: user.telephone || "",
        photo: user.photo || "",
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

  const handleAddFormationSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(addFormation(formationData));
    if (addFormation.fulfilled.match(res)) {
      setIsFormationModalOpen(false);
      setFormationData({
        titre: "",
        etablissement: "",
        anneeDebut: "",
        anneeFin: "",
        description: "",
      });
    }
  };

  const handleDeleteFormation = (id) => {
    if (window.confirm("Supprimer cette formation ?")) {
      dispatch(deleteFormation(id));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
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

      {/* Account Overview Banner */}
      <Card className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-[#161B22] to-[#1F2937]">
        <div className="w-20 h-20 rounded-2xl bg-[#00E6A5]/10 border border-[#00E6A5]/30 flex items-center justify-center text-[#00E6A5] text-2xl font-bold">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Avatar Candidat"
              className="w-full h-full rounded-2xl object-cover"
            />
          ) : (
            (user?.prenom?.[0] || user?.nom?.[0] || "C").toUpperCase()
          )}
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
      </Card>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Personal Details Card */}
        <Card className="space-y-5">
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
                value={user?.email || ""}
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
              URL de votre photo de profil
            </label>
            <input
              type="url"
              name="photo"
              placeholder="https://images.unsplash.com/..."
              value={formData.photo}
              onChange={handleChange}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
            />
          </div>

          {/* CV URL Field */}
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#00E6A5]" />
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
            <p className="text-[10px] text-[#62748E] mt-1">
              Ce lien sera automatiquement utilisé lors de vos candidatures.
            </p>
          </div>
        </Card>

        {/* Skills Tag Card (Smart Matching Engine Core) */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00E6A5]" />
              <span>Compétences & Savoir-faire</span>
            </h2>
            <span className="text-xs text-[#00E6A5] font-bold">
              {skills.length} compétence{skills.length > 1 ? "s" : ""}
            </span>
          </div>

          <p className="text-xs text-[#90A1B9]">
            Ces compétences sont automatiquement comparées aux exigences de chaque offre pour calculer votre score de compatibilité (Smart Matching).
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ajouter une compétence (ex: React, Node.js, Python, Figma...)"
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
            <Button onClick={handleAddSkill} icon={Plus} size="sm">
              Ajouter
            </Button>
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
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={profileLoading}
            icon={Save}
            className="px-6"
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>

      {/* Formations Section */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#00E6A5]" />
            <span>Formations & Diplômes</span>
          </h2>
          <Button
            onClick={() => setIsFormationModalOpen(true)}
            size="sm"
            icon={Plus}
          >
            Ajouter une formation
          </Button>
        </div>

        <div className="space-y-3">
          {formations.length === 0 ? (
            <p className="text-xs text-[#90A1B9] text-center py-6">
              Aucune formation enregistrée pour le moment.
            </p>
          ) : (
            formations.map((form) => (
              <div
                key={form._id}
                className="p-3.5 bg-[#0B0E14] border border-[#374151] rounded-xl flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{form.titre}</h4>
                  <p className="text-xs text-[#00E6A5] font-semibold">
                    {form.etablissement}
                  </p>
                  {(form.anneeDebut || form.anneeFin) && (
                    <p className="text-[10px] text-[#90A1B9]">
                      {form.anneeDebut} - {form.anneeFin || "Présent"}
                    </p>
                  )}
                  {form.description && (
                    <p className="text-xs text-[#CAD5E2] pt-1 leading-relaxed">
                      {form.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteFormation(form._id)}
                  className="p-1.5 text-[#90A1B9] hover:text-red-400 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add Formation Modal */}
      <Modal
        isOpen={isFormationModalOpen}
        onClose={() => setIsFormationModalOpen(false)}
        title="Ajouter une formation"
        subtitle="Renseignez vos diplômes et certifications"
      >
        <form onSubmit={handleAddFormationSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Intitulé du diplôme / formation *
            </label>
            <input
              type="text"
              placeholder="Ex: Master Informatique & Systèmes Décisionnels"
              value={formationData.titre}
              onChange={(e) =>
                setFormationData({ ...formationData, titre: e.target.value })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Établissement / Université *
            </label>
            <input
              type="text"
              placeholder="Ex: Faculté des Sciences Rabat"
              value={formationData.etablissement}
              onChange={(e) =>
                setFormationData({
                  ...formationData,
                  etablissement: e.target.value,
                })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Année de début
              </label>
              <input
                type="number"
                placeholder="2020"
                value={formationData.anneeDebut}
                onChange={(e) =>
                  setFormationData({
                    ...formationData,
                    anneeDebut: e.target.value,
                  })
                }
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Année de fin (ou vide si en cours)
              </label>
              <input
                type="number"
                placeholder="2023"
                value={formationData.anneeFin}
                onChange={(e) =>
                  setFormationData({
                    ...formationData,
                    anneeFin: e.target.value,
                  })
                }
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Description / Spécialisation
            </label>
            <textarea
              rows={3}
              placeholder="Détails du cursus, projets réalisés..."
              value={formationData.description}
              onChange={(e) =>
                setFormationData({
                  ...formationData,
                  description: e.target.value,
                })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00E6A5] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#374151]">
            <Button
              variant="secondary"
              onClick={() => setIsFormationModalOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" loading={formationLoading} icon={Plus}>
              Ajouter
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
