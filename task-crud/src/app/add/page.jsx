"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState([
    "Waterproof",
    "Wireless",
    "Fast Charging",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      productName,
      productDescription,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      releaseDate,
      features,
      category,
    };

    try {
      const response = await axios.post(
        "http://localhost:1000/product-management/add-product",
        data
      );
      console.log("Product Created:", response.data);

      toast.success("Product created successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        router.push("./");
      }, 1000);

      setProductName("");
      setProductDescription("");
      setPrice("");
      setStockQuantity("");
      setReleaseDate("");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to create product. Please try again.");
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
          Create a New Product
        </Typography>
        <Box variant="outlined" p={2} mt={2}>
          <Typography variant="h6" align="left">
            Product Information
          </Typography>
          <form onSubmit={handleSubmit}>
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
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
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
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>

            {error && (
              <Typography color="error" mt={2} align="center">
                {error}
              </Typography>
            )}
          </form>
        </Box>
      </Box>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default AddProduct;
