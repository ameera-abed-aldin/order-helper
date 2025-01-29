import Login from "./component/login";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { Rigister } from "./component/Rigister";
import AdminDashBoard  from "./pages/adminPages/AdminDashBoard";
import { AuthLayout } from "./pages/AuthLayout";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import BestSellerPage from "./pages/BestSellerPage";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./pages/Layout";
import User from './pages/User';
import { useAuth } from "./component/AuthContext";
import CatalogPage from "./pages/CatalogPage";


function App() {
 
  return (
    <>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/catalog/:catalogName" element={<CatalogPage/>} />
        </Route>
     

        <Route path="/BestSellerPage" element={<BestSellerPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Rigister />} />
        </Route>
        <Route  element={ <ProtectedRoute />  } >
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
       
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/catalog/:catalogName" element={<CatalogPage/>} />
        </Route>
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
