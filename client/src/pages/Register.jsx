import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  registerUser,
  clearError,
  getProfile,
} from "../features/auth/authSlice";
import {
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  Loader2,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const [role, setRole] = useState("Candidat");
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    nomEntreprise: "",
    email: "",
    telephone: "",
    motDePasse: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const isEntreprise = role === "AdministrateurEntreprise";

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (token) {
      if (user) {
        const role = user?.role;

        console.log("roleeeeeeeeeeeeee", user);

        if (role === "AdministrateurEntreprise") {
          navigate("/dashboard/entreprise");
        } else if (role === "Candidat") {
          navigate("/dashboard/candidat");
        } else if (role === "Administrateur") {
          navigate("/dashboard/admin");
        } else {
          console.error("Role not recognized:", role);
        }
      } else {
        dispatch(getProfile());
      }
    }
  }, [dispatch, token, user]);

  console.log("user", user);

  const handleRoleChange = (nextRole) => {
    if (nextRole === role) return;
    if (error) dispatch(clearError());
    setRole(nextRole);
    // On réinitialise les champs spécifiques au rôle pour ne pas
    // envoyer de données incohérentes au validateur backend.
    setFormData((prev) => ({
      ...prev,
      prenom: "",
      nom: "",
      nomEntreprise: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData ,role};

    if (!isEntreprise) {
      delete payload.nomEntreprise;
    }
    dispatch(registerUser(payload));
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-[#CAD5E2] flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="p-2 bg-[#00D5BE]/10 rounded-lg border border-[#00D5BE]/30">
            <div className="w-6 h-6 border-2 border-[#00D5BE] rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#00D5BE] rounded-full" />
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            SkillBridge
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Rejoindre SkillBridge
        </h1>
        <p className="text-[#90A1B9] text-sm">
          Créez votre compte en quelques étapes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-xl mb-6">
        <button
          type="button"
          onClick={() => handleRoleChange("Candidat")}
          className={`p-4 rounded-xl border transition-all flex flex-col items-center text-center ${
            !isEntreprise
              ? "border-[#00D5BE] bg-[#00D5BE]/5 shadow-[0_0_15px_rgba(0,213,190,0.15)]"
              : "border-[#222F46] bg-[#0D1322] hover:border-slate-700"
          }`}
        >
          <div
            className={`p-2.5 rounded-lg mb-2 ${!isEntreprise ? "bg-[#00D5BE] text-[#080C14]" : "bg-[#182232] text-[#90A1B9]"}`}
          >
            <User className="w-5 h-5" />
          </div>
          <span className="font-semibold text-white text-sm">Candidat</span>
          <span className="text-xs text-[#90A1B9] mt-0.5">
            Accéder aux offres & Smart Matching
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange("AdministrateurEntreprise")}
          className={`p-4 rounded-xl border transition-all flex flex-col items-center text-center ${
            isEntreprise
              ? "border-[#00D5BE] bg-[#00D5BE]/5 shadow-[0_0_15px_rgba(0,213,190,0.15)]"
              : "border-[#222F46] bg-[#0D1322] hover:border-slate-700"
          }`}
        >
          <div
            className={`p-2.5 rounded-lg mb-2 ${role === "AdministrateurEntreprise" ? "bg-[#00D5BE] text-[#080C14]" : "bg-[#182232] text-[#90A1B9]"}`}
          >
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-semibold text-white text-sm">Entreprise</span>
          <span className="text-xs text-[#90A1B9] mt-0.5">
            Publier des offres & recruter
          </span>
        </button>
      </div>

      <div className="w-full max-w-xl bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEntreprise ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Ex: Salima"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Ex: Benali"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">
                    Prénom du responsable
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Ex: Salima"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">
                    Nom du responsable
                  </label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Ex: Benali"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full bg-[#080C14] border border-[#222F46] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Nom de l'entreprise
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="nomEntreprise"
                    placeholder="Ex: TechCorp Solutions"
                    value={formData.nomEntreprise}
                    onChange={handleChange}
                    className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                placeholder="nom@exemple.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">
              Numéro de téléphone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="tel"
                name="telephone"
                placeholder="+212 6 00 00 00 00"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="password"
                name="motDePasse"
                placeholder="Au moins 6 caractères..."
                value={formData.motDePasse}
                onChange={handleChange}
                minLength={6}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded bg-[#080C14] border-[#222F46] accent-[#00D5BE]"
              required
            />
            <label
              htmlFor="terms"
              className="text-xs text-[#90A1B9] leading-relaxed select-none cursor-pointer"
            >
              J'accepte les Conditions Générales d'Utilisation de SkillBridge.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-6 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,213,190,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Création en cours...</span>
              </>
            ) : (
              <>
                <span>
                  Créer mon compte {isEntreprise ? "Entreprise" : "Candidat"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#90A1B9] mt-6">
            Déjà inscrit sur SkillBridge ?{" "}
            <Link
              to="/login"
              className="text-[#00D5BE] hover:underline font-medium"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
