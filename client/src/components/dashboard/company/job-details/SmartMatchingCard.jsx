import React from 'react';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export const SmartMatchingCard = ({ matchScore = 96, skills = [] }) => {
  const displaySkills = skills.length > 0 ? skills : ['React', 'TypeScript', 'Tailwind CSS', 'Jest / Vitest'];

  return (
    <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00D5BE]" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Smart Matching</h3>
              <span className="bg-[#00D5BE]/10 text-[#00D5BE] text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-[#00D5BE]/30">
                IA SKILLBRIDGE
              </span>
            </div>
            <p className="text-[10px] text-[#90A1B9]">Calculé en temps réel selon votre profil</p>
          </div>
        </div>

        <div className="relative w-12 h-12 rounded-full border-2 border-[#00D5BE] flex items-center justify-center text-[#00D5BE] font-black text-sm shadow-[0_0_12px_rgba(0,213,190,0.2)]">
          {matchScore}%
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold text-white">Détails de compatibilité :</p>
        
        {[
          { label: 'Compétences techniques', val: '100%' },
          { label: "Niveau d'expérience", val: '90%' },
          { label: 'Formation & Diplômes', val: '90%' },
          { label: 'Localisation & Télétravail', val: '100%' },
        ].map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#90A1B9]">{item.label}</span>
              <span className="font-bold text-white">{item.val}</span>
            </div>
            <div className="w-full bg-[#080C14] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00D5BE] h-full rounded-full" style={{ width: item.val }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 pt-3 border-t border-[#222F46]">
        <p className="text-xs font-bold text-white">Correspondance des compétences :</p>
        <div className="flex flex-wrap gap-1.5">
          {displaySkills.map((skill, idx) => (
            <span key={idx} className="bg-[#00D5BE]/10 border border-[#00D5BE]/30 text-[#00D5BE] text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium">
              <CheckCircle className="w-3 h-3" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-[#080C14] border border-[#222F46] rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#90A1B9]">
        <Info className="w-4 h-4 text-[#00D5BE] shrink-0" />
        <span>
          <strong className="text-white">{displaySkills.length} compétences sur {displaySkills.length}</strong> correspondent à votre profil.
        </span>
      </div>
    </div>
  );
};