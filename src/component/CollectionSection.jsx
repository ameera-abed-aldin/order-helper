import React from 'react';  
import { Container, Row, Col, Card } from 'react-bootstrap'; 
import CollectionCard from './CollectionCard';
import card1 from '../assets/card1.jpg';
import card2 from '../assets/card2.jpg';
import card3 from '../assets/card33.jpg';
import card4 from '../assets/card5.png';

 
 export default function CollectionSection(){
    const arr=[{
        image:card1,
        title:'For Her',
    }
,
{
    image:card2,
    title:'For Him',
},{
    image:card3,
    title:'For Kids',
},
{
    image:card4,
    title:'NEW',
}]
    return(
        <Container>  
            <h2 className="text-center fs-1 mb-4 mt-3">Featured Collection</h2>  
       
        <Row>  
          {/* Repeat this block for as many cards as needed */}  
          {arr.map((ele, index) => (  
            <Col xs={12} md={6}  key={index}>  
              <CollectionCard image={ele.image} title={ele.title}/>
            </Col>  
          ))}  
        </Row>  
      </Container>
    )
 }