import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { createReclamation, clearReclamationSuccess, clearReclamationError } from "../../features/reclamations/reclamationSlice";
import { fetchJobs } from "../../features/offres/offreSlice";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export const Complaints = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.offres);
  const { actionLoading, successMessage, error } = useSelector(
    (state) => state.reclamations
  );

  const [formData, setFormData] = useState({
    jobId: "",
    motif: "Offre frauduleuse ou fausse",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => dispatch(clearReclamationSuccess()), 4000);
      return () => clearTimeout(t);
    }
  }, [successMessage, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearReclamationError());
    const res = await dispatch(createReclamation(formData));
    if (createReclamation.fulfilled.match(res)) {
      setFormData({
        jobId: "",
        motif: "Offre frauduleuse ou fausse",
        description: "",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          <span>Réclamations & Signalements</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Signalez toute offre trompeuse, fausse entreprise ou comportement abusif à notre équipe de modération.
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

      <Card className="space-y-5">
        <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>
            Votre signalement est confidentiel et sera directement examiné par un Administrateur de la plateforme.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Sélectionner l'offre concernée *
            </label>
            <select
              value={formData.jobId}
              onChange={(e) =>
                setFormData({ ...formData, jobId: e.target.value })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              required
            >
              <option value="">-- Choisir une offre d'emploi --</option>
              {jobs.map((j) => (
                <option key={j._id} value={j._id}>
                  {j.titre} ({j.entreprise?.nomEntreprise || "Entreprise"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Motif de la réclamation *
            </label>
            <select
              value={formData.motif}
              onChange={(e) =>
                setFormData({ ...formData, motif: e.target.value })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
              required
            >
              <option value="Offre frauduleuse ou fausse">Offre frauduleuse ou fausse</option>
              <option value="Demande d'argent illégale">Demande de frais / argent illégale</option>
              <option value="Discrimination ou propos inappropriés">Discrimination ou propos inappropriés</option>
              <option value="Entreprise non reconnue ou usurpatrice">Entreprise non reconnue ou usurpatrice</option>
              <option value="Autre">Autre motif</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Explication détaillée *
            </label>
            <textarea
              rows={5}
              placeholder="Expliquez en détail les faits constatés..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] placeholder:text-[#62748E] resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            loading={actionLoading}
            icon={Send}
            variant="danger"
            className="w-full sm:w-auto px-6"
          >
            Soumettre le signalement
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Complaints;
