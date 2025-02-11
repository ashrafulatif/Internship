import { Box, Typography } from "@mui/material";
import React from "react";

const catagory = () => {
  return (
    <Box
      sx={{ textAlign: "center", padding: "20px" }}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Explore Products
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Explore products by category
      </Typography>
    </Box>
    
  );
};

export default catagory;
