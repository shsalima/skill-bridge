import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatut } from "../../../features/entreprise/entrepriseSlice";

export const JobsFilterTabs = ({ activeTab, setActiveTab, counts }) => {
  
  const tabs = [
    { id: "all", label: "Toutes les offres", count: counts.total, statut: "" },
    {
      id: "active",
      label: "Offres actives",
      count: counts.active,
      statut: "Ouverte",
    },
    {
      id: "closed",
      label: "Offres clôturées",
      count: counts.closed,
      statut: "Fermée",
    },
  ];

  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 border-b border-[#222F46]/60 pb-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              dispatch(setStatut(tab.statut));
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? "bg-[#00D5BE] text-[#080C14]"
                : "text-[#90A1B9] hover:text-white hover:bg-[#161F30]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive
                  ? "bg-[#080C14]/20 text-[#080C14]"
                  : "bg-[#161F30] text-[#90A1B9]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
