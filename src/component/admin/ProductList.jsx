// src={`data:image/png;base64,${product.images[0].image}`}
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  CircularProgress,
  Container,
} from "@mui/material";
import UpdateProduct from './UpdateProduct'
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon
import { useAuth } from "../AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const supplierId = 1;

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1/supplier/products/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [accessToken]);

  // Handle delete product
  const handleDelete = (productId) => {
    axios
      .delete(`/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        // Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
      })
      .catch((err) => {
        console.error("Failed to delete product:", err);
        setError("Failed to delete product. Please try again.");
      });
  };

  // Handle update product
  const handleUpdate = (productId) => {
    // Navigate to the update page or open a modal
    const newProduct=products.filter(product => product.productId === productId);
   console.log(newProduct);
   <UpdateProduct key={newProduct}/>
  };

  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Num</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Catalog</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product,index) => (
              <TableRow key={product.productId}>
                {/* Product ID */}
                <TableCell>{index+1}</TableCell>

                {/* Product Image */}
                <TableCell>
                  <img
                    src={`data:image/png;base64,${product.images[0].image}`} // Assuming the image is in Base64 format
                    alt={product.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </TableCell>

                {/* Product Name */}
                <TableCell>{product.name}</TableCell>

                {/* Category */}
                <TableCell>{product.productCat.categoryName}</TableCell>

                {/* Inventory */}
                <TableCell>
                  {product.productCatalog}
                </TableCell>

                {/* Price */}
                <TableCell>${product.price}</TableCell>

                {/* Actions */}
                <TableCell>
                  {/* Edit Icon Button */}
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleUpdate(product.productId)}
                  >
                    <EditIcon />
                  </IconButton>
                  {/* Delete Icon Button */}
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => handleDelete(product.productId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductList;