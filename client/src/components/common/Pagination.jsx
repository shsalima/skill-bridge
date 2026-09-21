import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;
  const btnStyle = "p-2 rounded-xl bg-[#161B22] border border-[#374151] text-[#90A1B9] hover:text-white disabled:opacity-40 transition-colors";
  
  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={btnStyle}><ChevronLeft className="w-4 h-4" /></button>
      <span className="text-xs text-[#90A1B9] px-3 font-medium">Page <strong className="text-white">{currentPage}</strong> sur <strong className="text-white">{totalPages}</strong></span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={btnStyle}><ChevronRight className="w-4 h-4" /></button>
    </div>
  );
};

export default Pagination;
