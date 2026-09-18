import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Briefcase, MapPin, Plus, AlertCircle, Calendar, Layers } from 'lucide-react';
import { clearEntrepriseError, createJob, getCompanyJobs } from '../../../features/entreprise/entrepriseSlice';
import { useNavigate } from 'react-router';

const initialFormState = {
  titre: '',
  domaine: '',
  typeContrat: 'CDI',
  ville: '',
  modalite: 'Hybride',
  salaireMin: '',
  salaireMax: '',
  dateLimite: '',
  description: '',
  competencesRequises: [],
};

export const CreateJobModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const entrepriseState = useSelector((state) => state.entreprise) || {};
  const { actionLoading: loading, error } = entrepriseState;

  const [formData, setFormData] = useState(initialFormState);
  const [currentSkill, setCurrentSkill] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData(initialFormState);
    setCurrentSkill('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !formData.competencesRequises.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        competencesRequises: [...formData.competencesRequises, currentSkill.trim()],
      });
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      competencesRequises: formData.competencesRequises.filter((s) => s !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dispatch) {
      dispatch(clearEntrepriseError());
      const result = await dispatch(createJob(formData));
      
      if (createJob.fulfilled.match(result)) {
        await dispatch(getCompanyJobs());
        resetForm(); 
        onClose();  
        navigate('/dashboard/entreprise/jobs'); 
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0D1322] border border-[#222F46] w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto my-auto">
        
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#222F46]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#00D5BE]" /> Publier une Nouvelle Offre
            </h2>
            <p className="text-xs text-[#90A1B9]">Remplissez les détails pour activer le Smart Matching</p>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1.5 bg-[#080C14] border border-[#222F46] rounded-lg text-[#90A1B9] hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Titre du poste *</label>
            <input
              type="text"
              name="titre"
              placeholder="Ex: Développeur Fullstack Senior"
              value={formData.titre}
              onChange={handleChange}
              className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Domaine *</label>
              <div className="relative">
                <Layers className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="domaine"
                  placeholder="Ex: Informatique / IT"
                  value={formData.domaine}
                  onChange={handleChange}
                  className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Ville *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="ville"
                  placeholder="Ex: Casablanca"
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Contrat</label>
              <select
                name="typeContrat"
                value={formData.typeContrat}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE]"
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Freelance">Freelance</option>
                <option value="Stage">Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Modalité</label>
              <select
                name="modalite"
                value={formData.modalite}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE]"
              >
                <option value="Hybride">Hybride</option>
                <option value="Télétravail">Télétravail</option>
                <option value="Présentiel">Présentiel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Date Limite *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="date"
                  name="dateLimite"
                  value={formData.dateLimite}
                  onChange={handleChange}
                  className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] transition-all"
                  required
                />
              </div>
            </div>
          </div>

+          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Salaire Min (DH/An)</label>
              <input
                type="number"
                name="salaireMin"
                placeholder="Ex: 120000"
                value={formData.salaireMin}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Salaire Max (DH/An)</label>
              <input
                type="number"
                name="salaireMax"
                placeholder="Ex: 180000"
                value={formData.salaireMax}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE]"
              />
            </div>
          </div>

          {/* Compétences requises */}
          <div>
            <label className="block text-xs font-medium text-white mb-1.5 flex items-center justify-between">
              <span>Compétences requises * (Au moins 2 compétences)</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Ex: React, Node.js..."
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                className="flex-1 bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00D5BE]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-[#222F46] hover:bg-[#00D5BE] hover:text-[#080C14] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-[#080C14] border border-[#222F46] rounded-lg">
              {formData.competencesRequises.length === 0 && (
                <span className="text-[11px] text-[#62748E]">Ajoutez au moins 2 compétences</span>
              )}
              {formData.competencesRequises.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Description *</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Détaillez les missions..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#080C14] border border-[#222F46] rounded-lg p-3.5 text-xs text-white focus:outline-none focus:border-[#00D5BE] resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222F46]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-lg border border-[#222F46] text-xs font-medium text-[#90A1B9] hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? "Création..." : "Publier l'offre"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};