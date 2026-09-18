import React from 'react';

export const CompanyMiniCard = ({ name, domaine, logo }) => {
  return (
    <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-5 flex items-center gap-3">
      <div className="w-12 h-12 bg-[#161F30] border border-[#222F46] rounded-xl flex items-center justify-center text-[#00D5BE] font-bold shrink-0 overflow-hidden">
        {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : (name?.[0] || 'F')}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{name || 'FinPay Europe'}</h4>
        <p className="text-xs text-[#90A1B9]">{domaine || 'Tech & Dev'}</p>
      </div>
    </div>
  );
};