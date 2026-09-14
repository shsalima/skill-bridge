import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { loginUser, clearError } from '../features/auth/authSlice';
import { Mail, Lock, Loader2, User, Building2, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  const handleQuickLogin = (email, password) => {
    if (error) dispatch(clearError());
    setFormData({ email, motDePasse: password });
    dispatch(loginUser({ email, motDePasse: password })).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-[#CAD5E2] flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="p-2 bg-[#00D5BE]/10 rounded-xl border border-[#00D5BE]/30 shadow-[0_0_15px_rgba(0,213,190,0.2)]">
            <div className="w-6 h-6 border-2 border-[#00D5BE] rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#00D5BE] rounded-full" />
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">SkillBridge</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Connexion à votre espace</h1>
        <p className="text-[#90A1B9] text-sm">
          Accédez à vos opportunités Smart Matching et gérez vos candidatures.
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
            <label className="block text-xs font-medium text-white mb-1.5">Adresse email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                placeholder="nom@exemple.fr"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
              <input
                type="password"
                name="motDePasse"
                placeholder="••••••••"
                value={formData.motDePasse}
                onChange={handleChange}
                className="w-full bg-[#080C14] border border-[#222F46] rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00D5BE] placeholder:text-[#62748E] transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded bg-[#080C14] border-[#222F46] accent-[#00D5BE]"
              />
              <label htmlFor="remember" className="text-xs text-[#90A1B9] select-none cursor-pointer">
                Se souvenir de moi
              </label>
            </div>
            <Link to="/forgot-password" className="text-xs text-[#00D5BE] hover:underline font-medium">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-6 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,213,190,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connexion...</span>
              </>
            ) : (
              <span>Se connecter</span>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="my-6 border-t border-[#222F46]/60" />

        <div>
          <p className="text-[10px] tracking-wider font-bold text-center text-[#90A1B9] uppercase mb-3">
            ACCÈS DÉMO INSTANTANÉ (1 CLIC) :
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('candidat@skillbridge.ma', '12345678')}
              className="p-3 bg-[#080C14] border border-[#222F46] hover:border-[#00D5BE]/50 rounded-xl transition-all flex flex-col items-center justify-center group"
            >
              <User className="w-4 h-4 text-[#00D5BE] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-white">Candidat</span>
              <span className="text-[10px] text-[#90A1B9]">Salima</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('entreprise@skillbridge.ma', '12345678')}
              className="p-3 bg-[#080C14] border border-[#222F46] hover:border-[#00D5BE]/50 rounded-xl transition-all flex flex-col items-center justify-center group"
            >
              <Building2 className="w-4 h-4 text-[#00D5BE] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-white">Entreprise</span>
              <span className="text-[10px] text-[#90A1B9]">CloudScale</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@skillbridge.ma', '12345678')}
              className="p-3 bg-[#080C14] border border-[#222F46] hover:border-[#00D5BE]/50 rounded-xl transition-all flex flex-col items-center justify-center group"
            >
              <ShieldCheck className="w-4 h-4 text-[#00D5BE] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-white">Admin</span>
              <span className="text-[10px] text-[#90A1B9]">Marc D.</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[#90A1B9] mt-6">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-[#00D5BE] hover:underline font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;