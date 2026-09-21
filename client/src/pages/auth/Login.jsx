import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { loginUser, clearError, getProfile } from "../../features/auth/authSlice";
import { Mail, Lock, ArrowRight, UserPlus, Building2 } from "lucide-react";
import Button from "../../components/common/Button";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  useEffect(() => {
    if (token) {
      if (user) {
        if (user.role === "AdministrateurEntreprise") {
          navigate("/entreprise/dashboard");
        } else if (user.role === "Administrateur") {
          navigate("/admin/dashboard");
        } else {
          navigate("/candidat/dashboard");
        }
      } else {
        dispatch(getProfile());
      }
    }
  }, [dispatch, token, user, navigate]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#CAD5E2] flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
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
          Connexion à votre compte
        </h1>
        <p className="text-[#90A1B9] text-xs">
          Accédez à votre espace Candidat, Entreprise ou Administrateur
        </p>
      </div>

      <div className="w-full max-w-md bg-[#161B22] border border-[#374151] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] focus:ring-1 focus:ring-[#00E6A5] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="password"
                name="motDePasse"
                placeholder="••••••••"
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
            Se connecter
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#374151] text-center space-y-3">
          <p className="text-xs text-[#90A1B9]">Pas encore de compte ?</p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/register/candidat"
              className="p-2.5 bg-[#0B0E14] border border-[#374151] hover:border-[#00E6A5]/50 rounded-xl text-xs font-semibold text-white hover:text-[#00E6A5] flex items-center justify-center gap-1.5 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#00E6A5]" />
              <span>Candidat</span>
            </Link>
            <Link
              to="/register/entreprise"
              className="p-2.5 bg-[#0B0E14] border border-[#374151] hover:border-[#00E6A5]/50 rounded-xl text-xs font-semibold text-white hover:text-[#00E6A5] flex items-center justify-center gap-1.5 transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-[#00E6A5]" />
              <span>Entreprise</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
