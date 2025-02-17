import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/TestEquipments";
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

const ProtectedRoutes = ({ isAuthenticated, isLoading }) => (
  <Layout>
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          >
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          >
            <Search />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          >
            <Profile />
          </ProtectedRoute>
        }
      />
      {/* Uncomment the following line to protect the About page */}
      {/* <Route
        path="/about"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <About />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  </Layout>
);

const AppRoutes = ({ isAuthenticated, isLoading }) => (
  <Routes>
    <Route path="/" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/test" element={<TestEquipments />} />
    <Route path="/skills" element={<AddSkills />} />
    <Route path="/interview" element={<InterviewScreen />} />
    <Route path="/feedback" element={<FeedbackScreen />} />
    <Route
      path="/*"
      element={
        <ProtectedRoutes
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
