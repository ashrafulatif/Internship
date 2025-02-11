"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import productsData from "@/Data/productData.json";
import { useRouter } from "next/navigation";

const CategoryCard = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  //extract unique categories
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(productsData.products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, []);

  const handleRouteCatagory = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <Box
      sx={{ textAlign: "center", padding: "20px" }}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Featured Categories
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Explore products by category
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {categories.map((category, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              width: "150px",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
            data-aos="fade-up"
            data-aos-duration="900"
            onClick={() => handleRouteCatagory(category)}
          >
            <Typography variant="h6">{category}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryCard;
