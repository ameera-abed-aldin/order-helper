import React, { useEffect, useState } from "react";
import { useCart } from "../Context/AddToCartContext";
import {
  Container,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Box,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Grid2 as Grid,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useAuth } from "../component/AuthContext";
import DeliveryPaymentStep from "../component/DeliveryPaymentStep";

const steps = ["Review Cart", "Delivery & Payment", "Place Order"];

const ViewCart = () => {
  const { cart, loading, fetchCart, removeFromCart } = useCart();
  const { accessToken, userLoggedDetails } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const userId = 1; // Replace with actual user ID
    fetchCart(userId, accessToken);
  }, []);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Your cart is empty 🛒</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {/* Stepper */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>

      {/* Cart Content */}
      {activeStep === 0 && (
        <Grid container spacing={2}>
          <Grid size={8} sx={{padding:"2rem"}}>
            {/* Cart Items Table */}
            <TableContainer sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            component="img"
                            sx={{ width: 100, height: 100, mr: 2 }}
                            src={`data:image/png;base64,${item.product.images[0].image}`}
                            alt={item.product.name}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.product.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          ${item.product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          ${item.quantity * item.product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() =>
                            removeFromCart(
                              userLoggedDetails.role[1].authority,
                              item.id,
                              accessToken
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid size={4} component={Paper} sx={{padding:"1rem 2.5rem",height:"fit-content"}}>
            {/* Total and Delivery Options */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Total
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sub-Total: ${cart.totalPrice}
              </Typography>

             
            </Box>

            {/* Checkout Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Check Out
              </Typography>
              <Typography variant="body1" gutterBottom>
                We Accept: PayPal, Stripe, WebMoney
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Got a discount code? Add it in the next step.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{ mt: 2 }}
                fullWidth
                onClick={handleNext} // Move to the next step
              >
                Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Step 2: Delivery & Payment */}
      {activeStep === 1 && (
          <DeliveryPaymentStep onBack={handleBack} onNext={handleNext} />
      )
      }

      {/* Step 3: Place Order */}
      {activeStep === 2 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Place Order</Typography>
          <Typography variant="body1">
            Review your order and confirm the purchase.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ViewCart;