import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Briefcase,
  Layers,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  X,
  ArrowLeft,
  Save,
  CheckCircle2,
} from "lucide-react";
import {
  createJob,
  updateJob,
  fetchJobById,
  clearOffreError,
  clearOffreSuccess,
} from "../../features/offres/offreSlice";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export const CreateEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditing = Boolean(id);

  const { selectedJob, actionLoading, error, successMessage } = useSelector(
    (state) => state.offres
  );

  const [formData, setFormData] = useState({
    titre: "",
    domaine: "",
    typeContrat: "CDI",
    ville: "",
    salaire: 0,
    dateLimite: "",
    description: "",
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [skillError, setSkillError] = useState("");

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, isEditing, id]);

  useEffect(() => {
    if (isEditing && selectedJob) {
      setFormData({
        titre: selectedJob.titre || "",
        domaine: selectedJob.domaine || "",
        typeContrat: selectedJob.typeContrat || "CDI",
        ville: selectedJob.ville || "",
        salaire: selectedJob.salaire || 0,
        dateLimite: selectedJob.dateLimite
          ? new Date(selectedJob.dateLimite).toISOString().split("T")[0]
          : "",
        description: selectedJob.description || "",
      });
      setSkills(selectedJob.competencesRequises || []);
    }
  }, [isEditing, selectedJob]);

  const handleChange = (e) => {
    if (error) dispatch(clearOffreError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
      setSkillError("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skills.length < 2) {
      setSkillError("Veuillez renseigner au moins 2 compétences pour le Smart Matching.");
      return;
    }

    const payload = {
      ...formData,
      competencesRequises: skills,
    };

    let res;
    if (isEditing) {
      res = await dispatch(updateJob({ jobId: id, jobData: payload }));
    } else {
      res = await dispatch(createJob(payload));
    }

    if (
      (isEditing && updateJob.fulfilled.match(res)) ||
      (!isEditing && createJob.fulfilled.match(res))
    ) {
      navigate("/entreprise/jobs");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <button
        onClick={() => navigate("/entreprise/jobs")}
        className="flex items-center gap-2 text-xs font-semibold text-[#90A1B9] hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à mes offres
      </button>

      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-[#00E6A5]" />
          <span>{isEditing ? "Modifier l'offre d'emploi" : "Publier une nouvelle offre"}</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Renseignez avec soin les compétences requises pour optimiser la compatibilité avec les candidats.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Titre du poste *
            </label>
            <input
              type="text"
              name="titre"
              placeholder="Ex: Développeur Fullstack React & Node.js"
              value={formData.titre}
              onChange={handleChange}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Domaine d'activité *
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="domaine"
                  placeholder="Ex: Informatique / IT, Finance, Marketing..."
                  value={formData.domaine}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Ville *
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
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Type de contrat *
              </label>
              <select
                name="typeContrat"
                value={formData.typeContrat}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Freelance">Freelance</option>
                <option value="Stage">Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Salaire mensuel (DH)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="number"
                  name="salaire"
                  placeholder="0 si négociable"
                  value={formData.salaire}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Date limite de candidature *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="date"
                  name="dateLimite"
                  value={formData.dateLimite}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills Requirements Tag Manager */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-white">
              Compétences requises * (Au moins 2 compétences pour le Smart Matching)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: React, Node.js, Docker, MongoDB..."
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill(e);
                  }
                }}
                className="flex-1 bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              />
              <Button onClick={handleAddSkill} size="sm" icon={Plus}>
                Ajouter
              </Button>
            </div>

            {skillError && <p className="text-[11px] text-red-400">{skillError}</p>}

            <div className="flex flex-wrap gap-2 p-3 bg-[#0B0E14] border border-[#374151] rounded-xl min-h-[44px] items-center">
              {skills.length === 0 ? (
                <span className="text-xs text-[#62748E] italic">
                  Aucune compétence ajoutée.
                </span>
              ) : (
                skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Description détaillée du poste & missions *
            </label>
            <textarea
              rows={6}
              name="description"
              placeholder="Détaillez les missions confiées, le cadre de travail, les avantages..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00E6A5] placeholder:text-[#62748E] resize-none"
              required
            />
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate("/entreprise/jobs")}
          >
            Annuler
          </Button>
          <Button type="submit" loading={actionLoading} icon={Save}>
            {isEditing ? "Enregistrer les modifications" : "Publier l'offre"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditJob;
