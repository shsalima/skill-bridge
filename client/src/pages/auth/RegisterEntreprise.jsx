import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { registerUser, clearError } from "../../features/auth/authSlice";
import { Building2, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import Button from "../../components/common/Button";

export const RegisterEntreprise = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    nomEntreprise: "",
    email: "",
    telephone: "",
    motDePasse: "",
  });

  useEffect(() => {
    if (token && user) {
      navigate("/entreprise/dashboard");
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        ...formData,
        role: "AdministrateurEntreprise",
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#CAD5E2] flex flex-col justify-center items-center p-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="p-2 bg-[#00E6A5]/10 rounded-xl border border-[#00E6A5]/30">
            <div className="w-6 h-6 border-2 border-[#00E6A5] rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#00E6A5] rounded-full" />
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            SkillBridge
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Inscription Entreprise
        </h1>
        <p className="text-[#90A1B9] text-xs">
          Publiez vos offres et qualifiez vos candidats par IA
        </p>
      </div>

      <div className="w-full max-w-lg bg-[#161B22] border border-[#374151] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Nom de l'entreprise *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="text"
                name="nomEntreprise"
                placeholder="Ex: TechCorp Maroc"
                value={formData.nomEntreprise}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Prénom du responsable *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Karim"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Nom du responsable *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="nom"
                  placeholder="Idrissi"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Email professionnel *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                placeholder="contact@techcorp.ma"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Téléphone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="tel"
                name="telephone"
                placeholder="+212 5 22 00 00 00"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Mot de passe * (min. 6 caractères)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="password"
                name="motDePasse"
                placeholder="••••••••"
                minLength={6}
                value={formData.motDePasse}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full mt-2"
            icon={ArrowRight}
          >
            Créer mon compte Entreprise
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#374151] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#90A1B9]">
          <Link to="/login" className="hover:text-[#00E6A5] transition-colors">
            Déjà inscrit ? Se connecter
          </Link>
          <Link
            to="/register/candidat"
            className="hover:text-[#00E6A5] transition-colors"
          >
            Vous êtes un Candidat ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterEntreprise;
