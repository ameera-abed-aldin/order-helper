import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import ProductCard from './ProductCard';
import {Row,Col} from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Typography } from '@mui/material';
export default function RelatedProduct({catalogName}){
    const [relatedProducts, setRelatedProducts] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null); 
    const {accessToken}=useAuth(); 
    const page = 0;  
    const size = 10; 
    useEffect(() => {  
        setLoading(true);  
        // Make the request to fetch products based on a category  
        axios.get('/api/v1/product/get/products/by/catalog', {  
            params: { catalog: catalogName, page, size },  
           headers: {  
               'Authorization': `Bearer ${accessToken}`,  
           }  
       })  
            .then((response) => {  
                
                setRelatedProducts(response.data.content);
                console.log(response.data)
                 
            })  
            .catch((err) => {  
                setError(err.message);  
            })  
            .finally(() => {  
                setLoading(false);  
            });  
    }, [catalogName]);  

    if (loading) {  
        return <div>Loading...</div>;  
    }  

    if (error) {  
        return <div>Error: {error}</div>;  
    }  
if(!loading){
    return ( 

        <>  
              <Typography variant="h4" component="h2" sx={{mb:7,mt:10,textAlign:"center"}}>Products You May Like </Typography>
            <div className="product-list"> 
        <Row>  
            {relatedProducts.map((product,index) => (  
                 <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 small-screen">
                       <ProductCard product={product}  />                 
                 </Col>
            ))} 
            </Row> 
           
        </div>  
        </>
    );  

}}