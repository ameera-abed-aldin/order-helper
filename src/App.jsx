import Login from "./component/login";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { Rigister } from "./component/Rigister";
import AdminDashBoard from "./pages/adminPages/AdminDashBoard";
import { AuthLayout } from "./pages/AuthLayout";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import BestSellerPage from "./pages/BestSellerPage";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./pages/Layout";
import User from "./pages/User";
import { useAuth } from "./component/AuthContext";
import CatalogPage from "./pages/CatalogPage";
import ViewCart from "./pages/ViewCart";
import { deepPurple } from '@mui/material/colors';  
import { createTheme, ThemeProvider } from '@mui/material/styles';  

const theme = createTheme({  
  palette: {  
    primary: {  
      main: deepPurple[500],   
    },  
  },  
}); 

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Rigister/>} />
      </Route>

      {/* User Routes (accessible to authenticated users) */}
      <Route element={<Layout />}>
        <Route path="/viewCart" element={<ViewCart />} />
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/catalog/:catalogName" element={<CatalogPage />} />
      </Route>

      {/* Protected Routes (only for SUPPLIER or specific roles) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Route>
    </Routes>
  </ThemeProvider>
  );
}

export default App;
