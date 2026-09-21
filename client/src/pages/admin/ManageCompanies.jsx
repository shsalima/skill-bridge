import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Search,
  Ban,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  AlertTriangle,
} from "lucide-react";
import { fetchAllCompanies, toggleBlockCompany } from "../../features/auth/authSlice";
import Card from "../../components/common/Card";

export const ManageCompanies = () => {
  const dispatch = useDispatch();
  const { companiesList, loading } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, [dispatch]);

  const handleToggleBlock = (companyId, name, isBlocked) => {
    const action = isBlocked ? "débloquer" : "bloquer";
    if (
      window.confirm(
        `Voulez-vous vraiment ${action} l'entreprise "${name}" ? ${
          !isBlocked
            ? "Ses offres ne seront plus visibles et elle ne pourra plus recruter."
            : ""
        }`
      )
    ) {
      dispatch(toggleBlockCompany(companyId));
    }
  };

  const filteredCompanies = companiesList.filter((c) => {
    const name = (c.nomEntreprise || "").toLowerCase();
    const city = (c.ville || "").toLowerCase();
    const manager = (c.user?.nom || "").toLowerCase() + " " + (c.user?.prenom || "").toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || city.includes(q) || manager.includes(q);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Building2 className="w-6 h-6 text-purple-400" />
          <span>Gestion des Entreprises Partenaires</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Vérifiez l'authenticité des entreprises et suspendez les comptes suspects ou frauduleux.
        </p>
      </div>

      {/* Search */}
      <Card className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher par nom d'entreprise, ville ou responsable..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
          />
        </div>
      </Card>

      {/* Companies List */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#374151] bg-[#0B0E14]/60 text-[#90A1B9] uppercase font-bold text-[10px]">
                <th className="p-4">Entreprise</th>
                <th className="p-4">Responsable</th>
                <th className="p-4">Localisation</th>
                <th className="p-4">Site Web</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions de modération</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#90A1B9]">
                    Aucune entreprise enregistrée pour le moment.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-[#0B0E14]/40 transition-colors text-white"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
                          {c.nomEntreprise?.[0]?.toUpperCase() || "E"}
                        </div>
                        <div>
                          <span className="font-bold block">
                            {c.nomEntreprise}
                          </span>
                          <span className="text-[11px] text-[#90A1B9] line-clamp-1 max-w-xs">
                            {c.description || "Pas de description"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold block">
                        {c.user?.prenom} {c.user?.nom}
                      </span>
                      <span className="text-[#90A1B9] text-[11px]">
                        {c.user?.email}
                      </span>
                    </td>
                    <td className="p-4 text-[#90A1B9]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00E6A5]" />
                        <span>{c.ville || "—"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {c.siteWeb ? (
                        <a
                          href={c.siteWeb}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#00E6A5] hover:underline flex items-center gap-1"
                        >
                          <span>Visiter</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[#62748E]">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {c.estBloquee ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                          <Ban className="w-3 h-3" />
                          Bloquée
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00E6A5]/10 text-[#00E6A5] border border-[#00E6A5]/30">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() =>
                          handleToggleBlock(c._id, c.nomEntreprise, c.estBloquee)
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                          c.estBloquee
                            ? "bg-[#00E6A5]/10 hover:bg-[#00E6A5] text-[#00E6A5] hover:text-[#0B0E14] border border-[#00E6A5]/30"
                            : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>{c.estBloquee ? "Débloquer" : "Bloquer"}</span>
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

export default ManageCompanies;
