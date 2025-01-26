import React from 'react';  
import { Container, Row, Col, Form, Button } from 'react-bootstrap';  


export default function FooterSection(){  
  return (  
    <footer className="text-dark" style={{backgroundColor:"#f4f7ff",marginTop:"3rem",padding:"3rem 4rem 1rem 4rem"}}>  
      <Container>  
        <Row className="mb-4 fs-10">  
          <Col md={6} lg={4}>  
            <h1 className="logo">EA</h1>  
            <p>Stay in Touch!
            Join our mailing list to receive the latest updates on new arrivals, special promotions, and exclusive offers designed just for you.</p>  
          
          </Col>  
          <Col md={2} >  
            <h6 >/ MENU</h6>  
            <ul className='hover-list'>  
              <li>Home</li>  
              <li>About us</li>  
              <li>Catalog</li>  
              <li>Collections</li>  
              <li>Sale</li>           
              <li>Contacts</li>  
            </ul>  
          </Col>  
          <Col md={2}>  
            <h6>/ CUSTOMERS</h6>  
            <ul className='hover-list'>  
              <li>Delivery and payment</li>  
              <li>Guarantees reviews</li>  
              <li>Returns and exchanges</li>  
              <li>Questions and answers</li>  
          
            </ul>  
          </Col>  
          <Col md={2}>  
            <h6>/ CONTACT</h6>  
            <p>+44 7087 390927</p>  
            <p>Eleena@gmail.com</p>  
            <p>Rammallah ,Palestain</p>  
          </Col>  
       
         
          <Col>  
            <h6>/ OUR SOCIAL</h6>  
            <ul className='hover-list'>  
              <li>Instagram</li>  
              <li>Facebook</li>  
              <li>Telegram</li>  
              <li>WhatsApp</li>  
            </ul>  
          </Col> 
          </Row> 
       
        <Row>  
          <Col className="text-center">  
            <p>© 2025 all rights reserved</p>  
            <p>Website created by Ameera and Malek</p>  
            <p>  
              <a href="/privacy">Privacy policy</a> | <a href="/terms">Terms & Conditions</a> | <a href="/language">Website language</a>  
            </p>  
          </Col>  
        </Row>  
      </Container>  
    </footer>  
  );  
};  

