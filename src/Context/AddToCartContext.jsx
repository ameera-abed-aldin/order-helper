import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create CartContext  
const CartContext = createContext();  

export const CartProvider = ({ children }) => {  
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch cart  
  const fetchCart = (userId, accessToken) => {  
    setLoading(true);
    axios
      .get(`/api/v1/session/get/currentSession/cartItems/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setCart(response.data);
      console.log(response.data  +"cart");}
    )
      .catch((error) => console.error("Error fetching cart:", error))
      .finally(() => setLoading(false));
  };  

  // Function to add item to cart  
  const addToCart = (userId, productId, accessToken, quantity) => {  
    return axios
      .post(`/api/v1/cartItem/add/${userId}/${productId}/${quantity}`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
      
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        throw error;
      });
  };

  // Function to remove item from cart  
  const removeFromCart = (userId, itemId, accessToken) => {
    axios
      .delete(`/api/v1/cartItem/delete/${itemId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => fetchCart(userId, accessToken))
      .catch((error) => console.error("Error removing item:", error));
  };

  return (  
    <CartContext.Provider value={{ cart, loading, fetchCart, addToCart, removeFromCart }}>  
      {children}  
    </CartContext.Provider>  
  );  
};  


export const useCart = () => useContext(CartContext);
export const useAddToCart = () => {
  const { addToCart } = useContext(CartContext);
  return { addToCart };
};
