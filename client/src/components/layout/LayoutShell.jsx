import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { getProfile } from "../../features/auth/authSlice";

export const LayoutShell = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Always fetch fresh profile on mount so competences/entreprise data is current
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#CAD5E2] flex flex-col font-sans">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 sm:p-8 min-h-[calc(100vh-4rem)] max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutShell;
