import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const FlipCard = ({ frontContent, backContent }) => {
  return (
    <Box
      sx={{
        perspective: "1000px",
        width: "100%",
        height: "300px",
        cursor: "pointer",
        "&:hover .flip-card-inner": {
          transform: "rotateY(180deg)",
        },
      }}
    >
      <Box
        className="flip-card-inner"
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
        }}
      >
        {/* Front Side */}
        <Card
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <CardContent>
            <Typography variant="body1" align="center">
              {frontContent.title}
            </Typography>
            <Typography variant="body2" align="center">
              {frontContent.text}
            </Typography>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#673AB7",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="body1" align="center">
              {backContent.title}
            </Typography>
            <Typography variant="body2" align="center">
              {backContent.text}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FlipCard;