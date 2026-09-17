// src/components/dashboard/company/HeroBanner.jsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HeroBanner = ({ companyName = "CloudScale Technologies", onCreateJob }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0D1322] via-[#121B2E] to-[#0D1322] border border-[#222F46] rounded-2xl p-6 mb-8">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D5BE]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#00D5BE]/10 border border-[#00D5BE]/20 px-3 py-1 rounded-full text-[#00D5BE] text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" /> SkillBridge Smart Matching Active
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
            Ravi de vous revoir, {companyName} 👋
          </h1>
          <p className="text-xs md:text-sm text-[#90A1B9] max-w-xl leading-relaxed">
            Vous avez <span className="text-[#00D5BE] font-semibold">12 nouvelles candidatures</span> qualifiées prêtes à être examinées aujourd'hui.
          </p>
        </div>

        <button 
          onClick={onCreateJob}
          className="bg-[#00D5BE] hover:bg-[#00D492] text-[#080C14] font-semibold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,213,190,0.25)] shrink-0"
        >
          Publier une offre <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};