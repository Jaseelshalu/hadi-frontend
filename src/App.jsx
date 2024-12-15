import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Voice from "./pages/Voice";
import Firebase from "./pages/Firebase";
import Logout from "./components/Logout";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      <Navigate to="/login" />;
      return;
    }
  }, [user]);

  const isLoggedIn = user !== null;

  return (
    <Router>
      <Routes>
        {/* Redirect based on login status */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        {/* Login route */}
        <Route path="/login" element={<Auth />} />
        {/* Home route (protected) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voice"
          element={
            <ProtectedRoute>
              <Voice />
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/firebase"
          element={
            <ProtectedRoute>
              <Firebase />
              <Logout />
            </ProtectedRoute>
          }
        />
        {/* Chat route (protected) */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
              <Logout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
