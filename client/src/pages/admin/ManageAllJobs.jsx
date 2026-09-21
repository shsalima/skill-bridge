import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Briefcase,
  Search,
  Trash2,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";
import { fetchJobs, deleteJob } from "../../features/offres/offreSlice";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { formatDate, formatSalary } from "../../utils/formatters";

export const ManageAllJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.offres);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = (jobId, title) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer définitivement l'offre "${title}" ? Cette action est irréversible.`
      )
    ) {
      dispatch(deleteJob(jobId));
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const title = (j.titre || "").toLowerCase();
    const domain = (j.domaine || "").toLowerCase();
    const city = (j.ville || "").toLowerCase();
    const company = (j.entreprise?.nomEntreprise || "").toLowerCase();
    const q = search.toLowerCase();
    return (
      title.includes(q) ||
      domain.includes(q) ||
      city.includes(q) ||
      company.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-[#00E6A5]" />
          <span>Modération & Gestion des Offres</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Surveillez toutes les offres publiées sur SkillBridge et supprimez les annonces frauduleuses ou non conformes.
        </p>
      </div>

      {/* Search */}
      <Card className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher par titre, entreprise, ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
          />
        </div>
      </Card>

      {/* Jobs Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#374151] bg-[#0B0E14]/60 text-[#90A1B9] uppercase font-bold text-[10px]">
                <th className="p-4">Offre</th>
                <th className="p-4">Entreprise</th>
                <th className="p-4">Contrat</th>
                <th className="p-4">Ville & Salaire</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Date de publication</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#90A1B9]">
                    Aucune offre d'emploi trouvée.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-[#0B0E14]/40 transition-colors text-white"
                  >
                    <td className="p-4 font-bold">
                      <span className="block">{job.titre}</span>
                      <span className="text-[11px] text-[#90A1B9] font-normal">
                        {job.domaine}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold block">
                        {job.entreprise?.nomEntreprise || "Entreprise"}
                      </span>
                      <span className="text-[11px] text-[#90A1B9]">
                        {job.entreprise?.email}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] uppercase font-bold bg-[#0B0E14] border border-[#374151] px-2 py-0.5 rounded text-[#90A1B9]">
                        {job.typeContrat}
                      </span>
                    </td>
                    <td className="p-4 text-[#90A1B9]">
                      <div>{job.ville}</div>
                      <div className="text-[11px] text-[#62748E]">
                        {formatSalary(job.salaire)}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge status={job.statut} />
                    </td>
                    <td className="p-4 text-[#90A1B9]">
                      {formatDate(job.createdAt)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(job._id, job.titre)}
                        className="p-2 text-[#90A1B9] hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                        title="Supprimer cette offre"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManageAllJobs;
