import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material"; // Material-UI icons
import { Link } from "react-router"; // Use Link from react-router-dom

export default function ProductCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited((prev) => !prev);
    // You can also handle other actions here, like sending a request to a server
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        background: "rgb(255,255,255)",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Favorite Icon */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", p: 1,position:"absolute" ,zIndex:"20"}}>
        <IconButton onClick={handleFavoriteClick}>
          {isFavorited ? (
            <Favorite  color="primary" sx={{  fontSize: "2rem" }} />
          ) : (
            <FavoriteBorder color="primary" sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
      </Box>

    
      <CardMedia
        component="img"
        image={`data:image/png;base64,${product.mainImage}`}
        alt={product.name}
        sx={{
          width: "100%",
          height: 350,
          objectFit: "cover",
          position: "relative",
          
        }}
      />

    
      <CardContent>
       
        <Typography
          variant="body1"
          component={Link}
          to={`/products/${product.productId}`}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {product.name}
        </Typography>

        {/* Price and Add to Cart Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            mt: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {product.price}$
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
             
             
              borderRadius: 1,
              textTransform: "none",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
          >
            + Add To Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}