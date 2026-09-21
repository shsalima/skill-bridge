import React from "react";
import { getStatusBadge } from "../../utils/formatters";

export const Badge = ({ children, variant = "default", status, className = "" }) => {
  const styles = {
    default: "bg-[#0B0E14] text-[#90A1B9] border-[#374151]",
    mint: "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    red: "bg-red-500/10 text-red-400 border-red-500/30",
    blue: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  };
  
  const activeStyle = status ? getStatusBadge(status) : styles[variant] || styles.default;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${activeStyle} ${className}`}>
      {children || status}
    </span>
  );
};

export default Badge;
