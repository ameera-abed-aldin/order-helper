
import React from "react";
import { Grid2 as Grid, Box, Typography, Button, keyframes } from "@mui/material";
import hero from "../assets/h1.svg";

// Define a keyframe animation
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export default function Hero() {
  return (
    <section className="background-circles" style={{height:"85vh"}}>
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
    <Grid container spacing={2} alignItems="center" sx={{ borderBottom:"1px solid gray"}} >
      {/* Left Side: Text Content */}
      <Grid size={6} xs={12} md={6}  >
 
        <Box sx={{ textAlign: "center",padding:"1.5rem 2rem" } }>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Welcome to ELEENA
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            We are here to help you choose your look.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "deepPurple.500",
              "&:hover": { backgroundColor: "deepPurple.700" },
            }}
          >
            Start Ordering
          </Button>
        </Box>
      </Grid>

      {/* Right Side: Image with Animation */}
      <Grid size={6} xs={12} md={6} className="hero">
        
      </Grid>
    </Grid>
    </section>
  );
}