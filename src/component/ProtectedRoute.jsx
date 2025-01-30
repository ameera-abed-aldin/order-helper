import { useEffect } from "react";
import {useAuth} from "./AuthContext";
import { useNavigate,Outlet } from "react-router";

export function ProtectedRoute(props){
const {accessToken,userLoggedDetails}=useAuth();
console.log(accessToken);
const nevigate=useNavigate();

  
useEffect(() => {  
    // Check if there's no access token  
    console.log(userLoggedDetails)
    if (!accessToken) {  
        nevigate("/login");  
    } else {  
      // Redirect based on user role  
      if (userLoggedDetails.role[0].authority === "SUPPLIER") {  
       
        nevigate("/admin/dashboard");  
      } else {  
        nevigate("/");  
      }  
    }  
  }, [accessToken, userLoggedDetails]);  

    return  <Outlet />;
}