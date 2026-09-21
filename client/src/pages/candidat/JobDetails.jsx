import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";
import { fetchJobById } from "../../features/offres/offreSlice";
import {
  applyToJob,
  fetchMyApplications,
  clearCandidatureSuccess,
  clearCandidatureError,
} from "../../features/candidatures/candidatureSlice";
import { createReclamation } from "../../features/reclamations/reclamationSlice";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import SmartMatchingBadge from "../../components/matching/SmartMatchingBadge";
import SmartMatchingDetails from "../../components/matching/SmartMatchingDetails";
import { calculateMatchScore } from "../../utils/matchingCalculator";
import { formatDate, formatSalary } from "../../utils/formatters";

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { selectedJob, selectedJobEntreprise, loading: jobLoading } = useSelector(
    (state) => state.offres
  );
  const {
    myApplications,
    actionLoading: applying,
    successMessage: applySuccess,
    error: applyError,
  } = useSelector((state) => state.candidatures);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const [applyForm, setApplyForm] = useState({
    cv: user?.cvUrl || "",
    lettreMotivation: "",
  });

  // Update CV field if user profile loads after component mounts
  useEffect(() => {
    if (user?.cvUrl) {
      setApplyForm((prev) => ({ ...prev, cv: prev.cv || user.cvUrl }));
    }
  }, [user?.cvUrl]);

  const [complaintForm, setComplaintForm] = useState({
    motif: "Offre frauduleuse ou fausse",
    description: "",
  });
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
      dispatch(fetchMyApplications());
    }
  }, [dispatch, id]);

  const candidateSkills = user?.competences || user?.skills || [];
  const requiredSkills =
    selectedJob?.competencesRequises ||
    selectedJob?.skillsRequired ||
    selectedJob?.competences ||
    [];
  const matchScore = calculateMatchScore(candidateSkills, requiredSkills);

  const existingApplication = myApplications.find(
    (a) => (a.job?._id || a.job) === id
  );

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    dispatch(clearCandidatureError());
    const res = await dispatch(
      applyToJob({
        jobId: id,
        applicationData: applyForm,
      })
    );
    if (applyToJob.fulfilled.match(res)) {
      setIsApplyModalOpen(false);
      setApplyForm({ cv: "", lettreMotivation: "" });
      dispatch(fetchMyApplications());
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      createReclamation({
        jobId: id,
        motif: complaintForm.motif,
        description: complaintForm.description,
      })
    );
    if (createReclamation.fulfilled.match(res)) {
      setComplaintSuccess(true);
      setTimeout(() => {
        setIsComplaintModalOpen(false);
        setComplaintSuccess(false);
        setComplaintForm({ motif: "Offre frauduleuse ou fausse", description: "" });
      }, 2000);
    }
  };

  if (jobLoading) {
    return (
      <div className="text-center py-20 text-xs text-[#90A1B9]">
        Chargement des détails de l'offre...
      </div>
    );
  }

  if (!selectedJob) {
    return (
      <div className="text-center py-20 text-xs text-[#90A1B9] space-y-3">
        <p>Cette offre d'emploi est introuvable ou a été retirée.</p>
        <Link to="/candidat/jobs" className="text-[#00E6A5] underline">
          Retour aux offres
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-semibold text-[#90A1B9] hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Retour aux opportunités
      </button>

      {/* Success banner */}
      {applySuccess && (
        <div className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{applySuccess}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Job & Company details) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#90A1B9] bg-[#0B0E14] px-2.5 py-1 rounded-md border border-[#374151]">
                    {selectedJob.typeContrat}
                  </span>
                  <span className="text-xs text-[#90A1B9]">{selectedJob.domaine}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedJob.titre}
                </h1>
                <p className="text-sm font-semibold text-[#00E6A5]">
                  {selectedJobEntreprise?.nomEntreprise ||
                    selectedJob.entreprise?.nomEntreprise ||
                    "Entreprise partenaire"}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <SmartMatchingBadge score={matchScore} size="md" />
                <span className="text-[11px] text-[#90A1B9]">
                  {matchScore >= 70 ? "Forte compatibilité" : "Compatibilité modérée"}
                </span>
              </div>
            </div>

            {/* Meta Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#374151] text-xs text-[#90A1B9]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00E6A5]" />
                <span>{selectedJob.ville}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#00E6A5]" />
                <span>{formatSalary(selectedJob.salaire)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00E6A5]" />
                <span>Limite : {formatDate(selectedJob.dateLimite)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {existingApplication ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Candidature soumise (Statut : {existingApplication.statut})
                  </span>
                </div>
              ) : selectedJob.statut === "Fermée" ? (
                <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
                  Cette offre est désormais clôturée
                </div>
              ) : (
                <Button
                  onClick={() => setIsApplyModalOpen(true)}
                  icon={Send}
                  className="px-6"
                >
                  Postuler maintenant
                </Button>
              )}

              <button
                onClick={() => setIsComplaintModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0B0E14] hover:bg-red-500/10 border border-[#374151] hover:border-red-500/30 text-[#90A1B9] hover:text-red-400 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Signaler cette offre</span>
              </button>
            </div>
          </Card>

          {/* Description Card */}
          <Card className="space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00E6A5]" />
              <span>Description du poste</span>
            </h2>
            <div className="text-xs text-[#CAD5E2] leading-relaxed whitespace-pre-line">
              {selectedJob.description}
            </div>
          </Card>

          {/* Company Card */}
          {selectedJobEntreprise && (
            <Card className="space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#00E6A5]" />
                <span>À propos de l'entreprise</span>
              </h2>
              <div className="space-y-1.5 text-xs text-[#90A1B9]">
                <p className="font-semibold text-white">
                  {selectedJobEntreprise.nomEntreprise}
                </p>
                {selectedJobEntreprise.description && (
                  <p className="leading-relaxed">
                    {selectedJobEntreprise.description}
                  </p>
                )}
                {selectedJobEntreprise.siteWeb && (
                  <a
                    href={selectedJobEntreprise.siteWeb}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00E6A5] hover:underline inline-block mt-1"
                  >
                    Visiter le site web ↗
                  </a>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column (Smart Matching AI Breakdown) */}
        <div className="space-y-6">
          <SmartMatchingDetails
            candidateSkills={candidateSkills}
            requiredSkills={requiredSkills}
          />
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Postuler à l'offre"
        subtitle={selectedJob.titre}
      >
        <form onSubmit={handleApplySubmit} className="space-y-4">
          {applyError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
              {applyError}
            </div>
          )}

          <div className="p-3 bg-[#0B0E14] border border-[#00E6A5]/30 rounded-xl flex items-center justify-between text-xs">
            <span className="text-[#90A1B9]">Votre score de compatibilité calculé :</span>
            <SmartMatchingBadge score={matchScore} size="sm" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Lien vers votre CV (PDF, Google Drive, portfolio...) *
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/mon-cv.pdf"
              value={applyForm.cv}
              onChange={(e) => setApplyForm({ ...applyForm, cv: e.target.value })}
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Lettre de motivation / Message d'introduction
            </label>
            <textarea
              rows={4}
              placeholder="Présentez brièvement votre motivation et vos atouts pour ce poste..."
              value={applyForm.lettreMotivation}
              onChange={(e) =>
                setApplyForm({ ...applyForm, lettreMotivation: e.target.value })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#374151]">
            <Button
              variant="secondary"
              onClick={() => setIsApplyModalOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" loading={applying} icon={Send}>
              Soumettre ma candidature
            </Button>
          </div>
        </form>
      </Modal>

      {/* Complaint Modal */}
      <Modal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        title="Signaler cette offre d'emploi"
        subtitle="Nos administrateurs examineront ce signalement"
      >
        <form onSubmit={handleComplaintSubmit} className="space-y-4">
          {complaintSuccess ? (
            <div className="p-4 bg-[#00E6A5]/10 border border-[#00E6A5]/30 rounded-xl text-[#00E6A5] text-xs font-semibold text-center">
              Votre signalement a été transmis à l'équipe d'administration. Merci pour votre vigilance !
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Motif du signalement *
                </label>
                <select
                  value={complaintForm.motif}
                  onChange={(e) =>
                    setComplaintForm({ ...complaintForm, motif: e.target.value })
                  }
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
                  required
                >
                  <option value="Offre frauduleuse ou fausse">Offre frauduleuse ou fausse</option>
                  <option value="Contenu inapproprié ou discriminatoire">Contenu inapproprié ou discriminatoire</option>
                  <option value="Entreprise suspecte / arnaque">Entreprise suspecte / arnaque</option>
                  <option value="Autre">Autre motif</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Description détaillée du problème *
                </label>
                <textarea
                  rows={4}
                  placeholder="Décrivez précisément ce qui justifie votre signalement..."
                  value={complaintForm.description}
                  onChange={(e) =>
                    setComplaintForm({ ...complaintForm, description: e.target.value })
                  }
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00E6A5] placeholder:text-[#62748E] resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#374151]">
                <Button
                  variant="secondary"
                  onClick={() => setIsComplaintModalOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="danger" icon={AlertTriangle}>
                  Envoyer le signalement
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default JobDetails;
