import React, { useEffect, useState } from "react";
import { Container, Accordion, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";
import RelatedProduct from '../component/RelatedProduct';
import { useAuth } from "../component/AuthContext";
import 'swiper/swiper-bundle.css'; // Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules'; // Correct import path

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { accessToken } = useAuth();
  const baseUrl = "data:image/png;base64,";

  useEffect(() => {
    axios
      .get(`/api/v1/product/get/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
        },
      })
      .then((response) => {
        const data = response.data;
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id, accessToken]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Container fluid className="">
        <section className="section-product d-md-flex p-4 w-100 flex-wrap">
          <div className="right d-md-flex flex-column">
            <h2 className="font-weight-bold">{product.name} 2025</h2>
            {/* Swiper Slider for Thumbnails */}
            <Swiper
              modules={[Navigation, Pagination, Thumbs]} // Initialize modules
              spaceBetween={10}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              className="thumbnail-swiper"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${baseUrl}${img.image}`}
                    alt={`Thumbnail ${index}`}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mid">
            {/* Swiper Slider for Main Image */}
            <Swiper
              modules={[Navigation, Pagination, Thumbs]} // Initialize modules
              spaceBetween={10}
              navigation
              pagination={{ clickable: true }}
              className="main-swiper"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${baseUrl}${img.image}`}
                    alt={`Product Image ${index}`}
                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="desc">
            <div className="d-flex desc-flex flex-wrap">
              <div className="desc-right">
                <p>SKU Code: <span>1234</span></p>
                <p>Supplier: <span>Zara</span></p>
                <p>Categories: <span>Makeup</span></p>
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
              </div>
              <div className="desc-left blue-color fs-2 d-md-flex align-items-start justify-content-end">
                {product.price}$
              </div>
            </div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" className="item-accord">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body className="text-secondary fs-10">
                  {product.description}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="item-accord">
                <Accordion.Header>Delivery</Accordion.Header>
                <Accordion.Body className="text-secondary fs-10">
                  Orders are processed within 1-3 business days
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
            <RelatedProduct category={product.category} />
          </Container>
        </section>
      </Container>
    </>
  );
};

export default ProductDetails;