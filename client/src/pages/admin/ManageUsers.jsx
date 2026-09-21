import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, Search, Trash2, Shield, User, Building2 } from "lucide-react";
import { fetchAllUsers, deleteUser } from "../../features/auth/authSlice";
import Card from "../../components/common/Card";
import { formatDate } from "../../utils/formatters";

export const ManageUsers = () => {
  const dispatch = useDispatch();
  const { usersList, loading } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (userId, name) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur ${name} ?`
      )
    ) {
      dispatch(deleteUser(userId));
    }
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      (u.nom || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.prenom || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case "Administrateur":
        return {
          label: "Super Admin",
          className: "bg-purple-500/10 text-purple-400 border-purple-500/30",
          icon: Shield,
        };
      case "AdministrateurEntreprise":
        return {
          label: "Entreprise",
          className: "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30",
          icon: Building2,
        };
      default:
        return {
          label: "Candidat",
          className: "bg-sky-500/10 text-sky-400 border-sky-500/30",
          icon: User,
        };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Users className="w-6 h-6 text-[#00E6A5]" />
          <span>Gestion des Utilisateurs</span>
        </h1>
        <p className="text-xs text-[#90A1B9] mt-1">
          Consultez la liste complète des utilisateurs enregistrés et gérez les comptes.
        </p>
      </div>

      {/* Filter Bar */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#90A1B9] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B0E14] border border-[#374151] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E6A5]"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: "all", label: "Tous" },
            { id: "Candidat", label: "Candidats" },
            { id: "AdministrateurEntreprise", label: "Entreprises" },
            { id: "Administrateur", label: "Admins" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                roleFilter === tab.id
                  ? "bg-[#00E6A5] text-[#0B0E14] font-bold"
                  : "bg-[#0B0E14] text-[#90A1B9] hover:text-white border border-[#374151]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#374151] bg-[#0B0E14]/60 text-[#90A1B9] uppercase font-bold text-[10px]">
                <th className="p-4">Utilisateur</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rôle</th>
                <th className="p-4">Téléphone</th>
                <th className="p-4">Date d'inscription</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#90A1B9]">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const roleBadge = getRoleBadge(u.role);
                  const Icon = roleBadge.icon;
                  return (
                    <tr
                      key={u._id}
                      className="hover:bg-[#0B0E14]/40 transition-colors text-white"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00E6A5]/10 border border-[#00E6A5]/30 flex items-center justify-center text-[#00E6A5] font-bold text-xs">
                          {(u.prenom?.[0] || u.nom?.[0] || "U").toUpperCase()}
                        </div>
                        <span className="font-semibold">
                          {u.prenom} {u.nom}
                        </span>
                      </td>
                      <td className="p-4 text-[#90A1B9]">{u.email}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold ${roleBadge.className}`}
                        >
                          <Icon className="w-3 h-3" />
                          {roleBadge.label}
                        </span>
                      </td>
                      <td className="p-4 text-[#90A1B9]">
                        {u.telephone || "—"}
                      </td>
                      <td className="p-4 text-[#90A1B9]">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="p-4 text-right">
                        {u.role !== "Administrateur" && (
                          <button
                            onClick={() =>
                              handleDelete(u._id, `${u.prenom} ${u.nom}`)
                            }
                            className="p-1.5 text-[#90A1B9] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Supprimer le compte"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManageUsers;
