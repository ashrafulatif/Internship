"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/product-management/find-product/${id}`
        );
        const product = response.data;

        setProductName(product.productName);
        setProductDescription(product.productDescription);
        setPrice(product.price);
        setStockQuantity(product.stockQuantity);
        setReleaseDate(product.releaseDate);
        setCategory(product.category);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProduct = {
      productName,
      productDescription,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      releaseDate,
      category,
    };

    try {
      await axios.patch(
        `http://localhost:1000/product-management/modify-product/${id}`,
        updatedProduct
      );

      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/"); // Redirect to product list after update
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 3,
          borderRadius: 2,
          border: "1px solid #ddd",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" align="center">
          Update Product
        </Typography>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                fullWidth
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                type="number"
                inputProps={{ step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                fullWidth
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Release Date"
                fullWidth
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Home Appliances">Home Appliances</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={2} textAlign="right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
