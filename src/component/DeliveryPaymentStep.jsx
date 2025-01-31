import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Grid2 as Grid,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import axios from "axios";

const DeliveryPaymentStep = ({
  onBack,
  onNext,
  handleNext,
  sessionId,
  userId,
  accessToken,
  setError,
  setMessage
}) => {
  // State for customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: "Vishnu Prasad V P",
    phone: "+1 80 78 9690",
    email: "vishnu@example.com",
    country: "United States",
    state: "California",
    zipCode: "00012",
    address: "433 Old Gate Ln, Milford",
  });

  const [paymentId, setPaymentId] = useState("");
  console.log(sessionId, userId, accessToken + "delvery");
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //
  const handlePay = () => {  
    // First API call to get payment ID  
    axios  
        .post(  
            `/api/v1/payment/add/${userId}`,  
            {},  
            {  
                headers: {  
                    Authorization: `Bearer ${accessToken}`,  
                },  
            }  
        )  
        .then((response) => {  
            if (response.status === 200) {  
              
                const paymentId = response.data.id;  
                setPaymentId(paymentId);  
                console.log("Payment ID:", paymentId);  

                // Proceed to the second API call only after we have paymentId  
                return axios.post(  
                    `/api/v1/checkout/add/${userId}/${sessionId}/${paymentId}`,  
                    {},  
                    {  
                        headers: {  
                            Authorization: `Bearer ${accessToken}`,  
                        },  
                    }  
                );  
            } else {  
                throw new Error("Failed to get payment ID");  
            }  
        })  
        .then((response) => {  
            if (response.status === 200) {  
              setMessage(  
                "We have received your order. It will take 3 to 5 days to deliver. Thank you for shopping with us!"  
            );   
                console.log("Checkout response:", response.data);  
                handleNext();
            }  
        })  
        .catch((err) => {  
            setError("Failed to process checkout. Please try again.");  
            console.error(err);  
        });  
};
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Delivery & Payment
      </Typography>

      {/* Customer Information */}
      <Grid container>
        <Grid size={8} spacing={2}>
          <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid size={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
              </Grid>

              <Grid size={6} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid size={6} xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid size={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid size={6} xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={customerInfo.country}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid size={6} xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={customerInfo.state}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={customerInfo.zipCode}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid size={12} xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid size={12} xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PaymentIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">Credit/Debit Card</Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Visa Number"
                  name="visaNumber"
                  margin="normal"
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid size={4}>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              <Divider />
              <ListItem>
                <ListItemText primary="Subtotal" />
                <Typography variant="body1">$149.00</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Shipping" />
                <Typography variant="body1">$11.76</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="h6">$160.76</Typography>
              </ListItem>
            </List>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
              onClick={handlePay} // Move to the next step
            >
              pay
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryPaymentStep;
