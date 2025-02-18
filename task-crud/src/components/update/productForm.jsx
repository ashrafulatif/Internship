import React from "react";
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
import { Controller } from "react-hook-form";

const ProductForm = ({ handleSubmit, control, errors, onSubmit, loading }) => {
  return (
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
                    <MenuItem value="Home Appliances">Home Appliances</MenuItem>
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
  );
};

export default ProductForm;
