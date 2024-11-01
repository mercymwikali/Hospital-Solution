import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ allowedRoles }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin;
  const location = useLocation();
  
  // Decode the access token if it exists
  const decodedUserInfo = userInfo?.userInfo?.accessToken 
    ? jwtDecode(userInfo.userInfo.accessToken) 
    : null;

  // Check if the user is not authenticated or not authorized
  if (!decodedUserInfo || !decodedUserInfo.user?.role || !allowedRoles.includes(decodedUserInfo.user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
