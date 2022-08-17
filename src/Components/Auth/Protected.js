import React from "react";
import {Navigate, Outlet, Route} from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "false") return <Navigate to="/login" />;
  else return <Outlet />;
};

export default Protected;