// CollectionSection.js  
import React from 'react';  
import { Container, Row, Col } from 'react-bootstrap';   
import { useNavigate } from 'react-router'; 
import CollectionCard from './CollectionCard';  
import card1 from '../assets/card1.jpg';  
import card2 from '../assets/card2.jpg';  
import card3 from '../assets/card33.jpg';   
import card4 from '../assets/card5.png';  
import { Typography } from '@mui/material';

export default function CollectionSection(){  
  const navigate = useNavigate(); 

    const arr = [  
        { image: card1, title: 'For Her', catalog :  "WOMEN" },  
        { image: card2, title: 'For Him', catalog: "MEN" },  
        { image: card3, title: 'For Kids', catalog: "Babies" },
        { image: card4, title: 'new', catalog: "new" }

      
    ];  

    // Function to handle card click  
    const handleCardClick = (catalog) => {  
      navigate(`/catalog/${catalog}`);  // Update the path based on your routing logic  
    };  

    return (  
        <Container>  

            <Typography variant="h4" component="h2" sx={{mb:7,mt:10,textAlign:"center"}}>Featured Collection</Typography>
            <Row>  
                {arr.map((ele, index) => (  
                    <Col xs={12} md={6} key={index}>  
                        <CollectionCard   
                            image={ele.image}   
                            title={ele.title}   
                            onClick={() => handleCardClick(ele.catalog)} // Pass the catalog name  
                        />  
                    </Col>  
                ))}  
            </Row>  
        </Container>  
    );  
}