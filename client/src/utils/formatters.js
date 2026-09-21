export const formatDate = (dateString) => {
  if (!dateString) return "Date inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "Date inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date).replace(',', ' à');
  } catch {
    return dateString;
  }
};

export const formatSalary = (salary) => {
  if (!salary || salary === 0) return "À négocier";
  return new Intl.NumberFormat("fr-FR").format(salary) + " DH/mois";
};

export const getStatusBadge = (statut) => {
  switch (statut) {
    case "Acceptée":
    case "Traitée":
    case "Ouverte":
      return "bg-[#00E6A5]/10 text-[#00E6A5] border-[#00E6A5]/30";
    case "En attente":
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case "Refusée":
    case "Rejetée":
    case "Fermée":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    default:
      return "bg-slate-700/20 text-slate-300 border-slate-700";
  }
};
