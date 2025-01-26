import { useContext,createContext, useState,useEffect } from "react";
import {jwtDecode} from "jwt-decode";
const authContext=createContext();
export function useAuth(){
    return useContext(authContext);
}

export function AuthContext(props){
    const [userLoggedDetails,setUserLoggedDetails]=useState(null);
    const [accessToken,setAccessToken] =useState(()=>localStorage.getItem('accessToken'));
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const value={login,logout,isLoggedIn,userLoggedDetails,accessToken};
     // Decode the token and set user information on initial load
  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken); // Decode the token
        setUserLoggedDetails(decodedToken);
        
        setIsLoggedIn(true); // Set logged-in status
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout(); // Log out if the token is invalid
      }
    }
  }, [accessToken]);
    function login(token){
        try {
            const decodedToken = jwtDecode(token); // Decode the token
            setAccessToken(token); // Store the token
            setIsLoggedIn(true); // Set logged-in status
            localStorage.setItem("accessToken", token); // Store token in localStorage
            setUserLoggedDetails(decodedToken); // Store decoded user information
          } catch (error) {
            console.error("Failed to decode token:", error);
          }
    }

    function logout(){
        setAccessToken(null);
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setUserLoggedDetails(null);
    }
    return(
        <authContext.Provider value={value}>
            {props.children}
        </authContext.Provider>
    )

}