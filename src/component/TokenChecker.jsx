import { useEffect } from 'react';  
import { useAuth } from './AuthContext'; // Adjust the import based on your file structure  
import { useNavigate } from 'react-router';  

const TokenChecker = () => {  
  const { userLoggedDetails, logout } = useAuth();  
  const navigate = useNavigate();  
  

  useEffect(() => {  
    const checkTokenExpiration = () => {  

      if (!userLoggedDetails) {  
        console.log('No user logged in');  
        logout(); 
        navigate('/login'); 
        return;  
      }  

      // If userLoggedDetails contains the 'exp' property, check it  
      const currentTime = Date.now() / 10000; 
      // Check if the token has expired  
      if (userLoggedDetails.exp < currentTime) {  
        console.log('Token has expired');  
        logout(); // Call logout function  
        navigate('/login'); // Redirect to login  
      } else {  
        console.log('Token is still valid');  
      }  
    };  

    // Check initially  
    checkTokenExpiration();  

    // Set an interval to check the token every minute  
    const intervalId = setInterval(checkTokenExpiration, 60000);  // Check every minute  

    return () => {  
      clearInterval(intervalId); // Cleanup the interval on unmount  
    };  
  }, [userLoggedDetails, logout, navigate]); // Depend on userLoggedDetails  

  return null; // This component does not render anything  
};  

export default TokenChecker;