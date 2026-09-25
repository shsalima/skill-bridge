import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user, loading } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token is present but user profile is loading, show spinner
  if (!user && loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center text-[#00E6A5]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {


    // Redirect to proper role dashboard
    if (user.role === "AdministrateurEntreprise") {

      return <Navigate to="/entreprise/dashboard" replace />;
    }
    if (user.role === "Administrateur") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/candidat/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
