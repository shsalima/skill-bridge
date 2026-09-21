import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-2xl" }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && isOpen && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className={`bg-[#161B22] border border-[#374151] w-full ${maxWidth} rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150`}>
        <div className="flex justify-between items-start pb-4 mb-5 border-b border-[#374151]">
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {subtitle && <p className="text-xs text-[#90A1B9] mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 bg-[#0B0E14] border border-[#374151] rounded-lg text-[#90A1B9] hover:text-white transition-all"><X className="w-4 h-4" /></button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
