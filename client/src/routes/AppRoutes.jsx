import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";

// Layout & Security
import LayoutShell from "../components/layout/LayoutShell";
import ProtectedRoute from "../components/layout/ProtectedRoute";

// Auth Pages
import Login from "../pages/auth/Login";
import RegisterCandidat from "../pages/auth/RegisterCandidat";
import RegisterEntreprise from "../pages/auth/RegisterEntreprise";

// Candidat Pages
import CandidatDashboard from "../pages/candidat/CandidatDashboard";
import JobList from "../pages/candidat/JobList";
import JobDetails from "../pages/candidat/JobDetails";
import MyApplications from "../pages/candidat/MyApplications";
import Recommendations from "../pages/candidat/Recommendations";
import Complaints from "../pages/candidat/Complaints";
import Profile from "../pages/candidat/Profile";
import SavedJobs from "../pages/candidat/SavedJobs";

// Entreprise Pages
import EntrepriseDashboard from "../pages/entreprise/EntrepriseDashboard";
import ManageJobs from "../pages/entreprise/ManageJobs";
import CreateEditJob from "../pages/entreprise/CreateEditJob";
import CandidateApplications from "../pages/entreprise/CandidateApplications";
import CompanyProfile from "../pages/entreprise/CompanyProfile";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageCompanies from "../pages/admin/ManageCompanies";
import ManageAllJobs from "../pages/admin/ManageAllJobs";
import ManageComplaints from "../pages/admin/ManageComplaints";
import AdminProfile from "../pages/admin/AdminProfile";

// Root redirect based on role
const RootRedirect = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role === "AdministrateurEntreprise") {
    return <Navigate to="/entreprise/dashboard" replace />;
  }
  if (user?.role === "Administrateur") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/candidat/dashboard" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterCandidat />} />
      <Route path="/register/candidat" element={<RegisterCandidat />} />
      <Route path="/register/entreprise" element={<RegisterEntreprise />} />

      {/* Candidat Routes (Protected & encapsulated in LayoutShell) */}
      <Route
        path="/candidat"
        element={
          <ProtectedRoute allowedRoles={["Candidat"]}>
            <LayoutShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/candidat/dashboard" replace />} />
        <Route path="dashboard" element={<CandidatDashboard />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profil" element={<Profile />} />
      </Route>

      {/* Candidat Aliases for backward compatibility */}
      <Route
        path="/dashboard/candidat"
        element={<Navigate to="/candidat/dashboard" replace />}
      />
      <Route
        path="/jobs"
        element={<Navigate to="/candidat/jobs" replace />}
      />
      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute allowedRoles={["Candidat", "AdministrateurEntreprise", "Administrateur"]}>
            <LayoutShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<JobDetails />} />
      </Route>

      {/* Entreprise Routes (Protected & encapsulated in LayoutShell) */}
      <Route
        path="/entreprise"
        element={
          <ProtectedRoute allowedRoles={["AdministrateurEntreprise"]}>
            <LayoutShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/entreprise/dashboard" replace />} />
        <Route path="dashboard" element={<EntrepriseDashboard />} />
        <Route path="jobs" element={<ManageJobs />} />
        <Route path="jobs/create" element={<CreateEditJob />} />
        <Route path="jobs/edit/:id" element={<CreateEditJob />} />
        <Route path="applications" element={<CandidateApplications />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="profil" element={<CompanyProfile />} />
      </Route>

      {/* Entreprise Aliases */}
      <Route
        path="/dashboard/entreprise"
        element={<Navigate to="/entreprise/dashboard" replace />}
      />
      <Route
        path="/dashboard/entreprise/jobs"
        element={<Navigate to="/entreprise/jobs" replace />}
      />

      {/* Administrateur Routes (Protected & encapsulated in LayoutShell) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Administrateur"]}>
            <LayoutShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="companies" element={<ManageCompanies />} />
        <Route path="jobs" element={<ManageAllJobs />} />
        <Route path="complaints" element={<ManageComplaints />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="profil" element={<AdminProfile />} />
      </Route>

      {/* Admin Alias */}
      <Route
        path="/dashboard/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;