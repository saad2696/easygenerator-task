// src/PrivateRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouterGuard = ({ children }: any) => {
  const { userData } = useSelector((state: any) => state.user);
  console.log(userData);
  if (userData) {
    // If the user is authenticated, redirect them away from the SignInPage
    if (children.type.name === "SignInPage") {
      return <Navigate to="/dashboard" />;
      // return <Navigate to={getDashboardRoute(userRole)} />;
    } else if (children.type.name === "SignUpPage") {
      return <Navigate to="/dashboard" />;
    } else {
      // You can navigate to any dashboard base on role
      return children;
    }
  } else {
    // If the user is not authenticated, allow access only to the SignInPage
    if (children.type.name === "SignInPage") {
      return children;
    } else if (children.type.name === "SignUpPage") {
      return children;
    }
    {
      return <Navigate to="/signin" />;
    }
  }
};

export default RouterGuard;
