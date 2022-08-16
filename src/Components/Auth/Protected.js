import React from "react";
import { Navigate, Route } from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "false") return <Navigate to="/" />;
  else return children;
};

export default Protected;