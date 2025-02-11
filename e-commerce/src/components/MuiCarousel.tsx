"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import imageSlider from "@/Data/imageSlider.json";

const MuiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  const goToNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % imageSlider.carouselImages.length
    );
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + imageSlider.carouselImages.length) %
        imageSlider.carouselImages.length
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: isMobile ? "250px" : "600px", // Smaller height on mobile
        overflow: "hidden",
        marginY: "2px",
        boxShadow: "none",
        transition: "height 0.3s ease-in-out", // Smooth transition
      }}
    >
      <Image
        src={imageSlider.carouselImages[currentIndex].imageUrl}
        alt={imageSlider.carouselImages[currentIndex].title || "Carousel image"}
        fill
        style={{
          objectFit: "cover",
        }}
        priority
      />
      <IconButton
        onClick={goToPrevious}
        sx={{
          position: "absolute",
          top: "50%",
          left: isMobile ? "10px" : "50px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          width: isMobile ? "30px" : "50px",
          height: isMobile ? "30px" : "50px",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ArrowBack fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
      <IconButton
        onClick={goToNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: isMobile ? "10px" : "50px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          width: isMobile ? "30px" : "50px",
          height: isMobile ? "30px" : "50px",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <ArrowForward fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};

export default MuiCarousel;
