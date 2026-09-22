import React from 'react';
import { useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#151C28] border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
        <div className="w-20 h-20 bg-[#00E6A5]/10 border border-[#00E6A5]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-[#00E6A5]" />
        </div>

        <h1 className="text-6xl font-extrabold text-[#00E6A5] tracking-widest mb-2">
          404
        </h1>

        
        <h2 className="text-2xl font-bold mb-3 text-slate-100">
          Page Non Trouvée
        </h2>

       
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-2 bg-[#00E6A5] hover:bg-[#00c78e] text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#00E6A5]/10"
        >
          <ArrowLeft className="w-5 h-5" />
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;