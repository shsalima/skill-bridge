import React from "react";
import { Sparkles } from "lucide-react";

export const SmartMatchingBadge = ({ score = 0, size = "md" }) => {
  const getColors = (val) => {
    if (val >= 75) {
      return {
        bg: "bg-[#00E6A5]/10",
        border: "border-[#00E6A5]/40",
        text: "text-[#00E6A5]",
        ring: "stroke-[#00E6A5]",
        glow: "shadow-[0_0_12px_rgba(0,230,165,0.25)]",
      };
    }
    if (val >= 45) {
      return {
        bg: "bg-amber-500/10",
        border: "border-amber-500/40",
        text: "text-amber-400",
        ring: "stroke-amber-400",
        glow: "shadow-[0_0_12px_rgba(245,158,11,0.25)]",
      };
    }
    return {
      bg: "bg-red-500/10",
      border: "border-red-500/40",
      text: "text-red-400",
      ring: "stroke-red-400",
      glow: "",
    };
  };

  const colors = getColors(score);

  if (size === "sm") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${colors.bg} ${colors.border} ${colors.text} ${colors.glow}`}
      >
        {/* {showIcon && <Sparkles className="w-3 h-3" />} */}
        {score}% Match
      </span>
    );
  }

  if (size === "lg") {
    return (
      <div
        className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 ${colors.border} ${colors.bg} ${colors.text} font-black text-base ${colors.glow}`}
      >
        {score}%
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${colors.bg} ${colors.border} ${colors.text} ${colors.glow}`}
    >
      {/* {showIcon} */}
      <span>{score}% Compatibilité</span>
    </span>
  );
};

export default SmartMatchingBadge;
