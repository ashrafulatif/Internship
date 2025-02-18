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
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null); // Manage product data state

  // Initialize react-hook-form
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch product details and set default values
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/product-management/find-product/${id}`
        );
        const product = response.data;
        setProductData(product); // Set fetched data

        // Set default values for form fields
        reset({
          productName: product.productName,
          productDescription: product.productDescription,
          price: product.price,
          stockQuantity: product.stockQuantity,
          releaseDate: product.releaseDate,
          category: product.category,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    const updatedProduct = {
      productName: data.productName,
      productDescription: data.productDescription,
      price: parseFloat(data.price),
      stockQuantity: parseInt(data.stockQuantity),
      releaseDate: data.releaseDate,
      category: data.category,
    };

    try {
      await axios.patch(
        `http://localhost:1000/product-management/modify-product/${id}`,
        updatedProduct
      );

      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        router.push("../");
      }, 1000);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state or form once product data is fetched
  if (!productData) {
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
        <CircularProgress />
      </Box>
    );
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Controller
                name="productName"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Name"
                    fullWidth
                    error={!!errors.productName}
                    helperText={errors.productName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="productDescription"
                control={control}
                rules={{ required: "Product description is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Product Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.productDescription}
                    helperText={errors.productDescription?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.01" }}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="stockQuantity"
                control={control}
                rules={{
                  required: "Stock quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Stock Quantity"
                    fullWidth
                    type="number"
                    error={!!errors.stockQuantity}
                    helperText={errors.stockQuantity?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="releaseDate"
                control={control}
                rules={{ required: "Release date is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Release Date"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.releaseDate}
                    helperText={errors.releaseDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={""}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Fashion">Fashion</MenuItem>
                      <MenuItem value="Home Appliances">
                        Home Appliances
                      </MenuItem>
                      <MenuItem value="Sports">Sports</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.category && (
                <Typography color="error" variant="caption">
                  {errors.category.message}
                </Typography>
              )}
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
      <ToastContainer />
    </Box>
  );
};

export default UpdateProduct;
