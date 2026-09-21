import React from "react";
import { Sparkles, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { getSkillAnalysis } from "../../utils/matchingCalculator";

export const SmartMatchingDetails = ({ candidateSkills = [], requiredSkills = [] }) => {
  const { matched, missing, score } = getSkillAnalysis(candidateSkills, requiredSkills);

  const getScoreTheme = (val) => {
    if (val >= 75) {
      return {
        text: "text-[#00E6A5]",
        border: "border-[#00E6A5]",
        bg: "bg-[#00E6A5]/10",
        bar: "bg-[#00E6A5] shadow-[0_0_10px_#00E6A5]",
        glow: "shadow-[0_0_15px_rgba(0,230,165,0.25)]",
        badge: "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30",
        status: "Excellente compatibilité",
      };
    }
    if (val >= 45) {
      return {
        text: "text-amber-400",
        border: "border-amber-400",
        bg: "bg-amber-500/10",
        bar: "bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
        glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        status: "Compatibilité intermédiaire",
      };
    }
    return {
      text: "text-red-400",
      border: "border-red-500",
      bg: "bg-red-500/10",
      bar: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.25)]",
      badge: "bg-red-500/10 text-red-400 border-red-500/30",
      status: "Compatibilité faible",
    };
  };

  const theme = getScoreTheme(score);

  return (
    <div className="bg-[#161B22] border border-[#374151] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#00E6A5]/10 border border-[#00E6A5]/30 rounded-xl">
            <Sparkles className="w-5 h-5 text-[#00E6A5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Smart Matching IA</h3>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${theme.badge}`}>
                {theme.status}
              </span>
            </div>
            <p className="text-xs text-[#90A1B9]">Analyse d'adéquation candidat / offre</p>
          </div>
        </div>

        {/* Dynamic circular gauge */}
        <div className="flex flex-col items-center">
          <div
            className={`w-14 h-14 rounded-full border-2 ${theme.border} ${theme.bg} ${theme.text} flex items-center justify-center font-black text-base transition-all duration-500 ${theme.glow}`}
          >
            {score}%
          </div>
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-[#90A1B9]">Taux de correspondance</span>
          <span className={`font-bold ${theme.text}`}>{score}%</span>
        </div>
        <div className="w-full bg-[#0B0E14] h-2.5 rounded-full overflow-hidden border border-[#374151]">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${theme.bar}`}
            style={{ width: `${Math.max(score, 3)}%` }}
          />
        </div>
      </div>

      {/* Matched Skills in Green */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-white flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#00E6A5]" />
          <span>Compétences validées ({matched.length}) :</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {matched.length === 0 ? (
            <span className="text-xs text-[#90A1B9] italic">
              Aucune compétence validée pour l'instant
            </span>
          ) : (
            matched.map((skill, idx) => (
              <span
                key={idx}
                className="bg-[#00E6A5]/10 border border-[#00E6A5]/30 text-[#00E6A5] text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {skill}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Missing Skills in Red */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-white flex items-center gap-1.5">
          <XCircle className="w-4 h-4 text-red-400" />
          <span>Compétences à acquérir ({missing.length}) :</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {missing.length === 0 ? (
            <span className="text-xs text-[#00E6A5] italic flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Toutes les compétences requises sont validées !
            </span>
          ) : (
            missing.map((skill, idx) => (
              <span
                key={idx}
                className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium"
              >
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                {skill}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Dynamic Recommendation Message */}
      <div className="bg-[#0B0E14] border border-[#374151] rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#CAD5E2]">
        <Lightbulb className={`w-4 h-4 shrink-0 mt-0.5 ${theme.text}`} />
        <span className="leading-relaxed">
          {score >= 75
            ? "Excellente opportunité ! Votre profil présente une très forte compatibilité avec ce poste. Vos chances de sélection sont optimales."
            : score >= 45
            ? "Profil pertinent ! Vous maîtrisez une partie importante des exigences. Pensez à valoriser vos compétences transversales dans votre lettre de motivation."
            : "Compatibilité faible à ce stade. Nous vous conseillons de mettre à jour vos compétences techniques sur votre profil ou de suivre les formations recommandées."}
        </span>
      </div>
    </div>
  );
};

export default SmartMatchingDetails;
