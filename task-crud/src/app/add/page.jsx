"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      productName: "",
      productDescription: "",
      price: "",
      stockQuantity: "",
      releaseDate: "",
      category: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:1000/product-management/add-product",
        {
          ...data,
          price: parseFloat(data.price),
          stockQuantity: parseInt(data.stockQuantity),
        }
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

      reset(); // Reset form after submission
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  fullWidth
                  {...register("productName", {
                    required: "Product Name is required",
                  })}
                  error={!!errors.productName}
                  helperText={errors.productName?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Product Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("productDescription", {
                    required: "Description is required",
                  })}
                  error={!!errors.productDescription}
                  helperText={errors.productDescription?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  fullWidth
                  type="number"
                  inputProps={{ step: "0.01" }}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be greater than 0" },
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Stock Quantity"
                  fullWidth
                  type="number"
                  {...register("stockQuantity", {
                    required: "Stock Quantity is required",
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  error={!!errors.stockQuantity}
                  helperText={errors.stockQuantity?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Release Date"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("releaseDate", {
                    required: "Release Date is required",
                  })}
                  error={!!errors.releaseDate}
                  helperText={errors.releaseDate?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select {...field}>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Home & Kitchen">
                          Home & Kitchen
                        </MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Books">Books</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <Typography color="error" variant="caption">
                      {errors.category.message}
                    </Typography>
                  )}
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
