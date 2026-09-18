import React from 'react';

export const JobDescriptionCard = ({ description }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#0D1322] border border-[#222F46] rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-white">Description du poste</h2>
        <p className="text-xs text-[#90A1B9] leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

    </div>
  );
};