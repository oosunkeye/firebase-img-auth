import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import Home from "./component/Home";

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser?.accessToken);

  let auth = { token: currentUser?.accessToken };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
