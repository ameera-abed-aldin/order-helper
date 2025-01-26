import ProductCard from "./ProductCard";
import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import{Row,Col} from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router";

export default function BestSeller(){
    const [products, setProducts] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
       
            axios.get('https://dummyjson.com/products') // Replace with your API endpoint  
                .then(response => {  
                    setProducts(response.data.products);
                   // Update state with received data  
                })  
                .catch(err => {  
                    setError(err.message); // Set the error message  
                    console.error('Error fetching products:', err);  
                })  
                .finally(() => {  
                    setLoading(false); // Always runs, even if there's an error  
                });  
      
    }, []);  

    if (loading) {  
        return <div>Loading...</div>; // Show loading indicator  
    }  

    if (error) {  
        return <div>Error: {error}</div>; // Display error message  
    }  
    const slicedData = products.slice(0, 4);
    return (  
        <section className="container">
             <h2 className="text-center fs-1 mb-4">Best Seller</h2> 
             
        <div className="product-list"> 
        <Row>  
            {slicedData.map((product,index) => (  
                 <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 small-screen">
                    <ProductCard product={product} />                   
</Col>
            ))} 
            </Row> 
        </div>
        <div className="d-flex justify-content-end blue-color">
                     <p className=""><Link to='./BestSellerPage' className="link">See More</Link></p>  
                     <div className=''> <FaArrowRight />  </div>   
                     </div>
        </section>
    );
    
}