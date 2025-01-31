import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Outlet, useLocation } from "react-router";

export function ProtectedRoute() {
  const { accessToken, userLoggedDetails } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    if (!accessToken) {
      navigate("/login", { state: { from: location.pathname } }); 
      return;
    }

  
    if (userLoggedDetails && userLoggedDetails.role[0].authority === "SUPPLIER") {

      navigate("/admin/dashboard");
      return;
    }

  }, [accessToken, userLoggedDetails, navigate, location]);

  // Render the nested routes if the user is authenticated and authorized
  return <Outlet />;
}