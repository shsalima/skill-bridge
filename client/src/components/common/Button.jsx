import React from "react";
import { Loader2 } from "lucide-react";

export const Button = ({ children, onClick, type = "button", variant = "primary", className = "", loading = false, disabled = false, icon: Icon, size = "md", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#00E6A5] text-[#0B0E14] hover:bg-[#00C293] shadow-lg",
    secondary: "bg-[#161B22] text-white hover:bg-[#1F2937] border border-[#374151]",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30",
    outline: "text-[#00E6A5] border border-[#00E6A5]/40 hover:bg-[#00E6A5]/10",
    ghost: "text-[#90A1B9] hover:text-white hover:bg-[#161B22]"
  };
  
  const sizes = { sm: "px-3 py-1.5 text-xs gap-1.5", md: "px-4 py-2.5 text-xs gap-2", lg: "px-5 py-3 text-sm gap-2.5" };

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Chargement...</> : <>{Icon && <Icon className="w-4 h-4" />}{children}</>}
    </button>
  );
};

export default Button;
