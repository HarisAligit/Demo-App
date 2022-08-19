import React from "react";
import {Navigate, Outlet, Route} from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
;
  if (isAuthenticated === "true")
  {
    return <Outlet />;
  }
  else {
    return <Navigate to="/login" />;
  }
};

export default Protected;