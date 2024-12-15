import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      <Navigate to="/login" />;
      return;
    }
  }, [user]);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
