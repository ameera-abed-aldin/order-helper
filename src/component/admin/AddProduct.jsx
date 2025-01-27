import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Use Grid2
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAuth } from "../AuthContext";

// Predefined categories
const categories = [
  { productCategoryId: 1, categoryName: "T-Shirts" },
  { productCategoryId: 2, categoryName: "Shirts" },
  { productCategoryId: 3, categoryName: "Jeans" },
  { productCategoryId: 4, categoryName: "Shorts" },
  { productCategoryId: 5, categoryName: "Jackets" },
  { productCategoryId: 6, categoryName: "Sweaters" },
  { productCategoryId: 7, categoryName: "Hoodies" },
  { productCategoryId: 8, categoryName: "Suits" },
];

// Predefined attributes
const predefinedAttributes = ["Color", "Size", "Material", "Brand"];

// ProductCatalog enum values
const productCatalogs = ["MEN", "WOMEN", "Babies"];

// Image Uploader Component
const ImageUploader = ({ images, handleFileChange, removeImage }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Images (Max 4)
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid key={index} xs={12}>
            {" "}
            {/* Each image takes full width (one image per row) */}
            <Box
              sx={{
                width: "100%",
                height: "150px",
                border: "1px dashed grey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Avatar
                src={URL.createObjectURL(image)}
                variant="square"
                sx={{ width: "100%", height: "100%", borderRadius: 0 }}
              />
              <IconButton
                onClick={() => removeImage(index)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "red",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
        {images.length < 4 && (
          <Grid size={3}>
            <Box
              sx={{
                width: "100%",
                height: "150px",
                border: "1px dashed grey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton component="label">
                <AddIcon fontSize="large" />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
                />
              </IconButton>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

// Attribute Input Component
const AttributeInput = ({
  attribute,
  index,
  handleAttributeChange,
  removeAttribute,
  errors,
}) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid size={7}>
        <Select
          value={attribute.attributesName}
          onChange={(e) =>
            handleAttributeChange(index, "attributesName", e.target.value)
          }
          fullWidth
          required
          error={!!errors[`attributes.${index}.attributesName`]}
        >
          <MenuItem value="">Select Attribute Key</MenuItem>
          {predefinedAttributes.map((attr) => (
            <MenuItem key={attr} value={attr}>
              {attr}
            </MenuItem>
          ))}
        </Select>
        {errors[`attributes.${index}.attributesName`] && (
          <Typography color="error" variant="caption">
            {errors[`attributes.${index}.attributesName`]}
          </Typography>
        )}
      </Grid>
      <Grid size={5}>
        <TextField
          label="Attribute Value"
          value={attribute.attributesValue}
          onChange={(e) =>
            handleAttributeChange(index, "attributesValue", e.target.value)
          }
          required
          fullWidth
          error={!!errors[`attributes.${index}.attributesValue`]}
          helperText={errors[`attributes.${index}.attributesValue`]}
        />
      </Grid>

      <Grid size={12} sx={{ marginBottom: "1rem" }}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          color="error"
          onClick={() => removeAttribute(index)}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

// Main AddProduct Component
const AddProduct = () => {
  // State for form fields
  const { accessToken } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage,setSuccessMessage] =useState("");
  const supplierId = 1;
  const [formData, setFormData] = useState({
    product: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      productCatalog: "",
    },
    productCategory: null,
    attributes: [{ attributesName: "", attributesValue: "" }],
    images: [],
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      product: {
        ...formData.product,
        [name]: value,
      },
    });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => cat.productCategoryId === e.target.value
    );
    if (selectedCategory) {
      setFormData({
        ...formData,
        productCategory: {
          productCategoryId: selectedCategory.productCategoryId,
          categoryName: selectedCategory.categoryName,
        },
      });
    }
  };

  // Handle file input change for multiple images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + formData.images.length > 4) {
      setErrors({ ...errors, images: "You can upload a maximum of 4 images." });
      return;
    }

    setFormData({
      ...formData,
      images: [
        ...formData.images,
        ...files.slice(0, 4 - formData.images.length),
      ],
    });
    setErrors({ ...errors, images: "" });
  };

  // Remove an image from the list
  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  // Handle attribute change
  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index][field] = value;
    setFormData({
      ...formData,
      attributes: updatedAttributes,
    });
  };

  // Add a new attribute field
  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [
        ...formData.attributes,
        { attributesName: "", attributesValue: "" },
      ],
    });
  };

  // Remove an attribute field
  const removeAttribute = (index) => {
    const updatedAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      attributes: updatedAttributes,
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.product.name) newErrors.name = "Required";
    if (!formData.product.description) newErrors.description = "Required";
    if (
      !formData.product.price ||
      isNaN(formData.product.price) ||
      formData.product.price <= 0
    )
      newErrors.price = "Must be a positive number";
    if (
      !formData.product.quantity ||
      isNaN(formData.product.quantity) ||
      formData.product.quantity <= 0
    )
      newErrors.quantity = "Must be a positive integer";
    if (!formData.productCategory) newErrors.productCategory = "Required";
    if (!formData.product.productCatalog) newErrors.productCatalog = "Required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    formData.attributes.forEach((attr, index) => {
      if (!attr.attributesName)
        newErrors[`attributes.${index}.attributesName`] = "Required";
      if (!attr.attributesValue)
        newErrors[`attributes.${index}.attributesValue`] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }

    const formDataToSend = new FormData();

    // Prepare productDto JSON
    const productDto = {
      product: {
        name: formData.product.name,
        description: formData.product.description,
        price: formData.product.price,
        quantity: formData.product.quantity,
        productCatalog: formData.product.productCatalog,
      },
      productCategory: {
        productCategoryId: formData.productCategory.productCategoryId,
        categoryName: formData.productCategory.categoryName,
      },
      attributes: formData.attributes.map((attr) => ({
        attributesName: attr.attributesName,
        attributesValue: attr.attributesValue,
      })),
    };

    // Append productDto as a JSON string
    formDataToSend.append("productDto", JSON.stringify(productDto));

    // Append all selected images to FormData
    formData.images.forEach((image) => {
      formDataToSend.append("multipartFile", image);
    });

    // Send the request using axios
    axios
      .post(
        `/api/v1/supplier/product/create/${supplierId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Product added successfully:", response.data);
        setSuccessMessage("Product added successfully");
        setSnackbarOpen(true);
        // Reset form after successful submission
        setFormData({
          product: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            productCatalog: "",
          },
          productCategory: null,
          attributes: [{ attributesName: "", attributesValue: "" }],
          images: [],
        });
        setErrors({});
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error(
          "Error adding product:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <>
    {/* Success Message */}
    {successMessage && (
      <Typography
        variant="body1"
        sx={{ color: "green", marginBottom: 2, textAlign: "center" }}
      >
        {successMessage}
      </Typography>
    )}

    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Column: Form Fields */}
        <Grid size={6} spacing={2}>
          <Paper sx={{ padding: 2 }}>
            {/* Product Name */}
            <TextField
              label="Product Name"
              name="name"
              onChange={handleChange}
              value={formData.product.name}
              required
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />

            {/* Product Description */}
            <TextField
              label="Product Description"
              name="description"
              onChange={handleChange}
              value={formData.product.description}
              required
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
            />

            {/* Product Price */}
            <TextField
              label="Product Price"
              name="price"
              type="number"
              onChange={handleChange}
              value={formData.product.price}
              required
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price}
            />

            {/* Product Quantity */}
            <TextField
              label="Product Quantity"
              name="quantity"
              type="number"
              onChange={handleChange}
              value={formData.product.quantity}
              required
              fullWidth
              margin="normal"
              error={!!errors.quantity}
              helperText={errors.quantity}
            />

            {/* Handling Attributes */}
            {formData.attributes.map((attribute, index) => (
              <AttributeInput
                key={index}
                attribute={attribute}
                index={index}
                handleAttributeChange={handleAttributeChange}
                removeAttribute={removeAttribute}
                errors={errors}
              />
            ))}
            <Button type="button" onClick={addAttribute} variant="outlined">
              Add Attribute
            </Button>
          </Paper>
        </Grid>

        {/* Right Column: Image Uploader, Catalog, and Categories */}
        <Grid size={6} spacing={2}>
          <Paper sx={{ padding: 2 }}>
            {/* Product Catalog */}
            <InputLabel>Product Catalog</InputLabel>
            <Select
              value={formData.product.productCatalog}
              onChange={handleChange}
              name="productCatalog"
              fullWidth
              margin="normal"
              sx={{ marginBottom: "1rem" }}
              required
              error={!!errors.productCatalog}
            >
              <MenuItem value="">Select a catalog</MenuItem>
              {productCatalogs.map((catalog) => (
                <MenuItem key={catalog} value={catalog}>
                  {catalog}
                </MenuItem>
              ))}
            </Select>
            {errors.productCatalog && (
              <Typography color="error" variant="caption">
                {errors.productCatalog}
              </Typography>
            )}

            {/* Product Category */}
            <InputLabel>Product Category</InputLabel>
            <Select
              value={
                formData.productCategory
                  ? formData.productCategory.productCategoryId
                  : ""
              }
              onChange={handleCategoryChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.productCategory}
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem
                  key={category.productCategoryId}
                  value={category.productCategoryId}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>

            {/* Image Uploader */}
            <ImageUploader
              images={formData.images}
              handleFileChange={handleFileChange}
              removeImage={removeImage}
            />
            {errors.images && (
              <Typography color="error">{errors.images}</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
        onClick={handleSubmit}
      >
        Add Product
      </Button>
      
    {/* Success Snackbar */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000} // Close after 6 seconds
      onClose={() => setSnackbarOpen(false)}
    >
      <Alert
        onClose={() => setSnackbarOpen(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        Product added successfully!
      </Alert>
    </Snackbar>
    </Box>
    </>
  );
};

export default AddProduct;
