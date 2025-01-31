import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS here
import "./index.css";
import App from "./App.jsx";
import { AuthContext } from "./component/AuthContext.jsx";
import { BrowserRouter } from "react-router";
import { CartProvider } from "./Context/AddToCartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
);
