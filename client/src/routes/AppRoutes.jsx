import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router"; 

import Register from "../pages/Register";
import Login from "../pages/Login";

// Enterprise Layout & Pages
import { CompanyLayout } from "../layouts/CompanyLayout";
import { CompanyDashboardHome } from "../pages/entreprise/CompanyDashboardHome";
import { CompanyJobsPage } from "../pages/entreprise/CompanyJobsPage";

// Other Pages
import { JobDetailsPage } from "../pages/entreprise/JobDetailsPage";

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
      {/* Auth Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 🏢 Entreprise Dashboard Routes */}
      <Route
        path="/dashboard/entreprise"
        element={
          <ProtectedRoute allowedRoles={['AdministrateurEntreprise']}>
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CompanyDashboardHome />} />
        <Route path="jobs" element={<CompanyJobsPage />} />
      </Route>

      {/* 👤 Candidate Route */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute allowedRoles={['Candidat']}>
        
          </ProtectedRoute>
        }
      />

      {/* 📄 Job Details Page */}
      <Route 
        path="/jobs/:id" 
        element={
          <ProtectedRoute allowedRoles={['Candidat', 'AdministrateurEntreprise']}>
            <JobDetailsPage />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;