import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router"; // تأكدي من react-router-dom
import { loginUser, clearError, getProfile } from "../features/auth/authSlice";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  console.log(token);

  useEffect(() => {
    if (token) {
      if (user) {
        const role = user?.role;

        if (role === "AdministrateurEntreprise") {
          navigate("/dashboard/entreprise");
        } else if (role === "Candidat") {
          navigate("/dashboard/candidat");
        } else if ( role === "Administrateur") {
          navigate("/dashboard/admin");
        } else {
          console.error("Role not recognized:", role);
        }
      } else {
        dispatch(getProfile());
      }
    }
  }, [dispatch, token, user]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
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
          Connexion à SkillBridge
        </h1>
        <p className="text-[#90A1B9] text-sm">
          Accédez à votre espace et retrouvez vos opportunités.
        </p>
      </div>

      <div className="w-full max-w-md bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white mb-1.5">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                placeholder="salima.benali@exemple.fr"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-white">
                Mot de passe
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#00D5BE] hover:underline font-medium"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="password"
                name="motDePasse"
                placeholder="Votre mot de passe..."
                value={formData.motDePasse}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="rounded bg-[#080C14] border-[#222F46] accent-[#0075FF]"
            />
            <label
              htmlFor="remember"
              className="text-xs text-[#90A1B9] select-none cursor-pointer"
            >
              Se souvenir de moi
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-6 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,213,190,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#90A1B9] mt-6">
            Vous n'avez pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-[#00D5BE] hover:underline font-medium"
            >
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
