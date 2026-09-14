
import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";


const ProtectedRoute = ({children,allowedRoles})=>{
    const {token,user} =useSelector((state)=>state.auth)

    if(!token){
        return <Navigate to="/login" replace/>
    }

    if(allowedRoles && !allowedRoles.includes(user?.role)){
        return <Navigate to="/login" replace/>
    }
    return children
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/register" replace />} />

      <Route
        path="/dashboard/candidat"
        element={
          <ProtectedRoute allowedRoles={['Candidat']}>
            <div className="min-h-screen bg-darkBg text-white p-8">
              <h1 className="text-2xl font-bold text-brand">Espace Candidat</h1>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/entreprise"
        element={
          <ProtectedRoute allowedRoles={['AdministrateurEntreprise']}>
            <div className="min-h-screen bg-darkBg text-white p-8">
              <h1 className="text-2xl font-bold text-brand">Espace Entreprise</h1>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <div className="min-h-screen bg-darkBg text-white p-8">
              <h1 className="text-2xl font-bold text-red-500">Panneau d'Administration</h1>
            </div>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
};

export default AppRoutes;