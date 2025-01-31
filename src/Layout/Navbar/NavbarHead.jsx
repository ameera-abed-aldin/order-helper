import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router"; // Use Link from react-router-dom
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../component/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../../Context/AddToCartContext";

export default function NavbarHead() {
  const itemCount = 0;
  const navigate = useNavigate();
  const { logout } = useAuth();
    const { cart} = useCart();

  const handelClick = () => {
    navigate("/viewCart");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Container>
        
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side: Brand and Links */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",

                fontWeight: "bold",
              }}
              color="primary"
            >
              EA
            </Typography>

            <div style={{ marginLeft: "20px", display: "flex", gap: "20px" }}>
              <Button
                component={Link}
                to="/"
                sx={{ color: "black", textTransform: "none" }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/about"
                sx={{ color: "black", textTransform: "none" }}
              >
                About Us
              </Button>
              <Button
                component={Link}
                to="/catalog"
                sx={{ color: "black", textTransform: "none" }}
              >
                Catalog
              </Button>
              <Button
                component={Link}
                to="/sale"
                sx={{ color: "black", textTransform: "none" }}
              >
                Sale
              </Button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Cart Icon with Badge */}
            <IconButton
              component={Link}
              to="/"
              sx={{ position: "relative" }}
              color="primary"
            >
              <FavoriteIcon />
            </IconButton>

            <IconButton
              onClick={handelClick}
              sx={{ position: "relative" }}
              color="primary"
            >
              <Badge badgeContent={itemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Login Button */}
            <Button
              onClick={handleLogout}
              sx={{ color: "black", textTransform: "none" }}
            >
              LogOut
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
