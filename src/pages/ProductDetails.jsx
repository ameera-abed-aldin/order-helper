import React, { useEffect, useState } from "react";
import { Container, Accordion, Image ,Form} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import RelatedProduct from '../component/RelatedProduct'


const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [images, setImages] = useState([]); // Default image
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        const data = response.data;
        setProduct(data);
          
        setImages([data.images[0], data.images[0], data.images[0]]);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Container fluid className="">
        <section className="section-product d-md-flex p-4 w-100 flex-wrap">
          <div className="right d-md-flex flex-column">
            <h2 className="font-weight-bold">{product.title} 2025</h2>
            <div className="thumbnail-images d-flex">
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  thumbnail
                  onClick={() => setMainImage(img)}
                  style={{
                    cursor: "pointer",
                    marginBottom: "10px",
                    background:
                      "linear-gradient(to right, rgb(229 236 255), rgb(255, 255, 255))",
                    border: "none",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mid">
            <Image src={mainImage} fluid />
          </div>
          <div className="desc">
            <div className="d-flex desc-flex flex-wrap">
              <dv className="desc-right">
                <p>sku code:<span>1234</span></p>
                <p>Suplier:<span>Zara</span></p>
                <p>Catgories:<span>makeup</span></p>
                <div>
                  <Form>
                    <Form.Group controlId="formSizeSelect">
                      
                      <Form.Control
                        as="select"
                        value={selectedSize}
                        onChange={handleSizeChange}
                      >
                        <option value="">Select Size</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">Extra Large</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>
              </dv>
              <div className="desc-left  blue-color fs-2 d-md-flex align-items-start justify-content-end">{product.price}$</div>
            </div>
            
      <Accordion defaultActiveKey="0" >  
        <Accordion.Item eventKey="0" className="item-accord">  
          <Accordion.Header>Description</Accordion.Header>  
          <Accordion.Body className="text-secondary fs-10">  
            {product.description}  
          </Accordion.Body>  
        </Accordion.Item>  
        
        <Accordion.Item eventKey="1" className="item-accord">  
          <Accordion.Header>Delivery</Accordion.Header>  
          <Accordion.Body className="text-secondary fs-10">  
          Orders are processed within  1-3 business days  
          </Accordion.Body>  
        </Accordion.Item>  
        <Accordion.Item eventKey="2" className="item-accord">  
          <Accordion.Header>Payment</Accordion.Header>  
          <Accordion.Body className="text-secondary fs-10">  
          Your payment is processed securely through our payment gateway, ensuring your information is protected.  
          </Accordion.Body>  
         </Accordion.Item>  
      </Accordion> 
          </div>
      </section> 
      <section className="relatedProduct">
<Container>
    
    <RelatedProduct  category={product.category}/>
</Container>
      </section>
      </Container>
    </>
  );
};

export default ProductDetails;
