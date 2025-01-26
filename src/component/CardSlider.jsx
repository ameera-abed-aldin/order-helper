import React from 'react';  
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';  

const CardSlider = () => {  
    const cardData = [  
       
        {  
            title: "Eco-responsibility",  
            text: "We choose eco-friendly materials and ethical production methods ."  
        },  
        {  
            title: "Individual choice",  
            text: "A variety of styles and sizes allow everyone to find clothes that fit perfectly."  
        },  
        {  
            title: "Comfort and practicality",  
            text: "Our clothes provide maximum comfort to make you feel good in any situation."  
        },  
        {  
            title: "Customer care",  
            text: "We care about the needs of each customer and strive to provide a high level of service."  
        }
       
    ];  

    return (  
        <Container className="mt-5">  
            {/* Show Cards on Larger Screens */}  
            <Row className="d-none d-lg-flex justify-content-center">  
                {cardData.map((card, index) => (  
                    <Col md={3} key={index} className="mb-4">  
                        <Card className="text-center card-back">  
                            <Card.Body className='height-card'>  
                                <div className="logo">EA</div>  
                                <Card.Title className="fs-10">{card.title}</Card.Title>  
                                <Card.Text className='fs-10'>{card.text}</Card.Text>  
                            </Card.Body>  
                        </Card>  
                    </Col>  
                ))}  
            </Row>  

            {/* Show Carousel on Smaller Screens */}  
            <Row className="d-lg-none mb-4">  
                <Carousel>  
                    {cardData.map((card, index) => (  
                        <Carousel.Item key={index}>  
                            <Card className="text-center height-card-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>  
                                <Card.Body>  
                                    <div className="logo">El</div>  
                                    <Card.Title className="fs-10">{card.title}</Card.Title>  
                                    <Card.Text className="fs-10">{card.text}</Card.Text>  
                                </Card.Body>  
                            </Card>  
                        </Carousel.Item>  
                    ))}  
                </Carousel>  
            </Row>  
        </Container>  
    );  
};  

export default CardSlider;