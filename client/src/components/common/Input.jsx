import React from "react";

export const Input = ({ label, name, type = "text", placeholder, value, onChange, required, error, icon: Icon, className = "", helperText, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="block text-xs font-semibold text-white">{label} {required && <span className="text-[#00E6A5]">*</span>}</label>}
    <div className="relative">
      {Icon && <Icon className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3 pointer-events-none" />}
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} className={`w-full bg-[#0B0E14] border ${error ? "border-red-500" : "border-[#374151]"} rounded-xl ${Icon ? "pl-10" : "px-3.5"} pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5] ${className}`} {...props} />
    </div>
    {helperText && !error && <p className="text-[11px] text-[#90A1B9]">{helperText}</p>}
    {error && <p className="text-[11px] text-red-400">{error}</p>}
  </div>
);

export default Input;
