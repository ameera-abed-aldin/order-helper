import React from "react";
import { Container, Grid2 as Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlipCard from "./FlipCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const cardData = [
    {
      front: { title: "Eco-responsibility", text: "We choose eco-friendly materials." },
      back: { title: "Eco Tips", text: "Learn how to recycle properly." },
    },
    {
      front: { title: "Individual choice", text: "Find clothes that fit perfectly." },
      back: { title: "Style Guide", text: "Discover your personal style." },
    },
    {
      front: { title: "Comfort and practicality", text: "Feel good in any situation." },
      back: { title: "Comfort Tips", text: "Wear clothes that suit your lifestyle." },
    },
    {
      front: { title: "Customer care", text: "We provide high-level service." },
      back: { title: "Support", text: "Contact us for any assistance." },
    },
    {
        front: { title: "Comfort and practicality", text: "Feel good in any situation." },
        back: { title: "Comfort Tips", text: "Wear clothes that suit your lifestyle." },
      },
      {
        front: { title: "Customer care", text: "We provide high-level service." },
        back: { title: "Support", text: "Contact us for any assistance." },
      },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
    <Typography variant="h4" component="h2" sx={{mb:5,mt:5,textAlign:"center"}}>Why To Choose Us</Typography>
       
        <Slider {...sliderSettings}>
          {cardData.map((card, index) => (
            <div key={index}>
              <FlipCard frontContent={card.front} backContent={card.back} />
            </div>
          ))}
        </Slider>
      
      
    </Container>
  );
};

export default CardSlider;