// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Search from "../components/Search";
import Profile from "../components/Profile";
import TestEquipments from "../components/TestEquipments";
import AddSkills from "../components/AddSkills";
import InterviewScreen from "../components/InterviewScreen";
import FeedbackScreen from "../components/FeedbackScreen";
import LandingPage from "../components/LandingPage";
import AdditionalInfo from "../components/AdditionalInfo";
import { useAuth } from "../contexts/AuthContext";

// Wrapper for routes that need the layout
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Protected routes that require Layout
const LayoutProtectedRoutes = () => (
  <Route
    element={
      <ProtectedRoute>
        <LayoutWrapper />
      </ProtectedRoute>
    }
  >
    <Route path="home" element={<Home />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="search" element={<Search />} />
    <Route path="profile" element={<Profile />} />
  </Route>
);

// Protected routes that do not use Layout
const NoLayoutProtectedRoutes = () => (
  <Route
    element={
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    }
  >
    <Route path="test" element={<TestEquipments />} />
    <Route path="skills" element={<AddSkills />} />
    <Route path="interview" element={<InterviewScreen />} />
    <Route path="feedback" element={<FeedbackScreen />} />
    <Route path="additional" element={<AdditionalInfo />} />
  </Route>
);

// Component to protect the login route
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // If the user is authenticated, redirect them to the dashboard (or any other protected route)
  if (isAuthenticated) {
    return <Navigate to="/skills" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Redirect any other route to /login */}
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected routes available at the root level */}
      <Route path="/*" element={<Outlet />}>
        {LayoutProtectedRoutes()}
        {NoLayoutProtectedRoutes()}
        {/* Catch-all for undefined protected routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
