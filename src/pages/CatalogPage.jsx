import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import { useParams } from 'react-router';  
import { useAuth } from '../component/AuthContext';
import { Grid2 as Grid, Container, Typography } from '@mui/material';
import ProductCard from '../component/ProductCard'; // Adjust the import path as necessary
import FilterSidebar from '../component/FilterSidebar'; // Adjust the import path as necessary

const CatalogPage = ({ catalog }) => {  
    const [products, setProducts] = useState([]);  
    const [error, setError] = useState(null); 
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { accessToken } = useAuth();
    const { catalogName } = useParams();
    const page = 0;  
    const size = 10; 

    useEffect(() => {  
        const fetchProducts = () => {  
            axios.get('/api/v1/product/get/products/by/catalog', {  
                 params: { catalog: catalogName, page, size },  
                headers: {  
                    'Authorization': `Bearer ${accessToken}`,  
                }  
            })   
            .then((response) => {  
                setProducts(response.data.content); 
                window.scrollTo(0, 0); 
                console.log(response.data.content);
            })  
            .catch((error) => {  
                setError(error.message);  
            });  
        };  

        fetchProducts();  
    }, [catalogName, accessToken]); 

    const handleCategoryChange = (category) => {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    };

    return (  
        <Container maxWidth="lg" sx={{ marginTop: '16px' }}>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}  
            <Typography variant="h4" sx={{ marginBottom: '2rem',mt:7,mb:5 }}>
                Products  for {catalogName}
            </Typography>
            <Grid container spacing={3}>
                {/* Categories Sidebar (Single Column) */}
                <Grid size={3} xs={12} md={3}>
                    <FilterSidebar 
                        selectedCategories={selectedCategories} 
                        onCategoryChange={handleCategoryChange} 
                        
                    />
                </Grid>

                {/* Product Cards (Remaining Space) */}
                <Grid  size={9} xs={12} md={9}>
                    <Grid container spacing={3}>
                        {products.map(product => (  
                            <Grid size={4}  spacing={3} key={product.id} xs={12} sm={6} md={4}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}  
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );  
};  

export default CatalogPage;