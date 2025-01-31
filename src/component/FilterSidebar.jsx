import React from 'react';
import { List, ListItem, ListItemText, Checkbox, Typography, Box } from '@mui/material';

const categories = [
  { productCategoryId: 1, categoryName: "T-Shirts" },
  { productCategoryId: 2, categoryName: "Accessories" },
  { productCategoryId: 3, categoryName: "Jeans" },
  { productCategoryId: 4, categoryName: "Shoes" },
  { productCategoryId: 5, categoryName: "Jackets" },
  { productCategoryId: 6, categoryName: "Sweaters" },
  { productCategoryId: 7, categoryName: "Hoodies" },
  { productCategoryId: 8, categoryName: "Suits" },
];

export default function FilterSidebar({ selectedCategories, onCategoryChange }) {
  return (
    <Box sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category.productCategoryId} dense button>
            <Checkbox
              edge="start"
              checked={selectedCategories.includes(category.categoryName)}
              onChange={() => onCategoryChange(category.categoryName)}
             color="primary" 
            />
            <ListItemText primary={category.categoryName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}