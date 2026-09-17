import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router"; 

import Register from "../pages/Register";
import Login from "../pages/Login";
import CompanyDashboard from "../pages/CompanyDashboard"; 

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard/candidat"
        element={
          <ProtectedRoute allowedRoles={['Candidat']}>
            <div className="min-h-screen bg-[#080C14] text-white p-8">
              <h1 className="text-2xl font-bold text-[#00D5BE]">Espace Candidat</h1>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/entreprise"
        element={
          <ProtectedRoute allowedRoles={['AdministrateurEntreprise']}>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Administrateur']}>
            <div className="min-h-screen bg-[#080C14] text-white p-8">
              <h1 className="text-2xl font-bold text-red-500">Panneau d'Administration</h1>
            </div>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;