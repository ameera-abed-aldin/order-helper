import React, { useEffect, useState } from "react";  
import {  
  Container,  
  Typography,  
  Button,  
  FormControlLabel,  
  FormGroup,  
  Snackbar,  
  Grid2 as Grid,  
  Radio,   
  RadioGroup,  
  TextField  
} from "@mui/material";  
import {  
  Accordion,  
  AccordionSummary,  
  AccordionDetails,  
} from '@mui/material';  
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  
import axios from "axios";  
import { useParams } from "react-router";  
import { useAuth } from "../component/AuthContext";  
import { useAddToCart } from "../Context/AddToCartContext";  
import MuiAlert from '@mui/material/Alert';  
import 'swiper/swiper-bundle.css';  
import { Swiper, SwiperSlide } from 'swiper/react';  
import { Navigation, Pagination, Thumbs } from 'swiper/modules';   
import RelatedProduct from '../component/RelatedProduct';   

const Alert = React.forwardRef(function Alert(props, ref) {  
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;  
});  

const ProductDetails = () => {  
  const { id } = useParams();  
  const [product, setProduct] = useState(null);  
  const [selectedSizes, setSelectedSizes] = useState([]);   
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);  
  const baseUrl = "data:image/png;base64,";   
  const { accessToken ,userLoggedDetails} = useAuth();  
  const { addToCart } = useAddToCart();  
  const [openSnackbar, setOpenSnackbar] = useState(false);  
  const [error, setError] = useState(null); // State for error handling  

  // Fetch product details  
  useEffect(() => {  
    axios  
      .get(`/api/v1/product/get/${id}`, {  
        headers: {  
          Authorization: `Bearer ${accessToken}`,  
        },  
      })  
      .then((response) => {  
        setProduct(response.data);  
      })  
      .catch((error) => {  
        console.error("Error fetching product details:", error);  
      });  
  }, [id, accessToken]);  

  const handleSizeChange = (event) => {  
    setSelectedSizes([event.target.value]);   
  };  

  const handleAddToCart = () => {  
    if (selectedSizes.length > 0) {  
      if (quantity >= 1) { // Check if quantity is greater than 1  
        const userId = userLoggedDetails.role[1].authority; // Assuming you get the current user's ID from auth context or another source  
        const productId = product.productId;  
        addToCart(userId, productId, accessToken, quantity)  
          .then(() => {  
            setOpenSnackbar(true); // Show success snackbar  
          })  
          .catch((error) => {  
            setError("There was an error adding the product to the cart."); // Set error message  
            console.error(error);  
          });  
      } else {  
        alert("Quantity must be greater than 0."); // Prompt for valid quantity  
      }  
    } else {  
      alert("Please select at least one size before adding to cart."); // Prompt for size selection  
    }  
  };  

  const handleSnackClose = () => {  
    setOpenSnackbar(false);  
  };  

  if (!product) return <div>Loading...</div>;  

  return (  
    <Container>  
      <Grid container spacing={2}>  
        <Grid size={6}>  
          <Swiper  
            spaceBetween={10}  
            navigation={true}  
            thumbs={{ swiper: thumbsSwiper }}  
            modules={[Navigation, Pagination, Thumbs]}  
            className="main-swiper"  
            style={{ marginBottom: "1.5rem" }}  
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
            <Swiper  
              onSwiper={setThumbsSwiper}  
              spaceBetween={10}  
              slidesPerView={4}  
              freeMode={true}  
              watchSlidesProgress={true}  
              modules={[Thumbs, Navigation]}  
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
          </Grid>   
         
          <Grid size={6}>       
            <Typography variant="h4" gutterBottom>  
              {product.name}  
            </Typography>  
            <Typography variant="subtitle1" gutterBottom>  
              Catalog: {product.productCatalog}  
            </Typography>  
            <Typography variant="subtitle2" gutterBottom>  
              Categories: {product.productCat.categoryName}  
            </Typography>  
            <Typography variant="subtitle2" gutterBottom>  
              Supplier ID: {product.supplierId} {/* Assuming you want to show the supplier ID */}  
            </Typography>  
            <Typography variant="h6" gutterBottom>  
              Price: {product.price}$  
            </Typography>  
            
            <FormGroup>  
              <Typography variant="h6">Select Size</Typography>  
              <RadioGroup value={selectedSizes[0] || ''} onChange={handleSizeChange}>  
                {["S", "M", "L", "XL"].map((size) => (  
                  <FormControlLabel  
                    control={<Radio value={size} />}  
                    label={size}  
                    key={size}  
                  />  
                ))}  
              </RadioGroup>  
  
              {/* Quantity Input Field */}  
              <TextField   
                type="number"   
                value={quantity}   
                onChange={(e) => setQuantity(Math.max(1, e.target.value))} // Ensure quantity is at least 1  
                label="Quantity"   
                variant="outlined"   
        
                sx={{ marginTop: "1rem" }}   
              />  
            </FormGroup>  
  
            <Button fullWidth variant="contained" color="primary" onClick={handleAddToCart} sx={{ marginBottom: "1rem"}}>  
              Add to Cart  
            </Button>   
            
            <div>  
              <Accordion defaultExpanded>  
                <AccordionSummary  
                  expandIcon={<ExpandMoreIcon />}  
                  aria-controls="description-content"  
                  id="description-header"  
                >  
                  <Typography>Description</Typography>  
                </AccordionSummary>  
                <AccordionDetails>  
                  <Typography className="text-secondary fs-10">  
                    {product.description}  
                  </Typography>  
                </AccordionDetails>  
              </Accordion>  
  
              <Accordion>  
                <AccordionSummary  
                  expandIcon={<ExpandMoreIcon />}  
                  aria-controls="delivery-content"  
                  id="delivery-header"  
                >  
                  <Typography>Delivery</Typography>  
                </AccordionSummary>  
                <AccordionDetails>  
                  <Typography className="text-secondary fs-10">  
                    Orders are processed within 1-3 business days.  
                  </Typography>  
                </AccordionDetails>  
              </Accordion>  
  
              <Accordion>  
                <AccordionSummary  
                  expandIcon={<ExpandMoreIcon />}  
                  aria-controls="payment-content"  
                  id="payment-header"  
                >  
                  <Typography>Payment</Typography>  
                </AccordionSummary>  
                <AccordionDetails>  
                  <Typography className="text-secondary fs-10">  
                    Your payment is processed securely through our payment gateway, ensuring your information is protected.  
                  </Typography>  
                </AccordionDetails>  
              </Accordion>  
            </div>   
          </Grid>  
        </Grid>  
  
        {/* Snackbar for success message */}  
        <Snackbar  
          open={openSnackbar}  
          autoHideDuration={6000}  
          onClose={handleSnackClose}  
          action={<Alert onClose={handleSnackClose} severity="success">Product added to cart!</Alert>}  
        />  
  
        {/* Error Handling */}  
        {error && <Alert severity="error">{error}</Alert>}   
        
        {/* Related Products Section */}  
        <section className="relatedProduct">  
          <Container>  
            <RelatedProduct catalogName={product.productCatalog} />  
          </Container>  
        </section>  
      </Container>  
    );  
  };  
  
  export default ProductDetails;